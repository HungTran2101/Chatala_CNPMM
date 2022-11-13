const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const { generateJWT, randomNumber, decodeJWT } = require('../utils/utilFunctions');
const ErrorHandler = require('../utils/errorHandler');
const { sendEmail, send } = require('../utils/mailer');
const { Encrypter } = require('../utils/encrypter');
const constants = require('../constants');
const bcrypt = require('bcryptjs');

const encrypter = new Encrypter();
const prefixRegister = 'register-';
const prefixForgotPassword = 'forgotPw-';
const prefixResetPasswordToken = 'resetPwToken-';

const getUserIdFromUIDCookie = (token, prefix, next) => {
	try {
		const dencrypt = encrypter.dencrypt(token);
		const userId = dencrypt.replace(prefix, '');

		if (!userId) return next(new ErrorHandler('Validate session error', 404));

		return userId;
	} catch (err) {
		return next(new ErrorHandler('Validate session error', 404));
	}
};

const registerUser = asyncHandler(async (req, res, next) => {
	const { name, password, email } = req.body;

	const verifiedtoken = randomNumber(100000, 999999);

	const newUser = await Users.create({
		name,
		email,
		password,
		verifiedtoken
	});

	if (constants.NODE_ENV !== 'DEVELOPMENT') {
		sendEmail(email, 'Verify your account', 'Verified Token: ' + verifiedtoken).catch(() => {
			Users.deleteOne({ _id: newUser._id });
		});
	}

	console.log('\x1b[36m%s\x1b[0m', 'Verified Token: ' + verifiedtoken);

	const encryptedUID = encrypter.encrypt(prefixRegister + newUser._id.toString());
	res.cookie('UID', encryptedUID, {
		signed: true,
		httpOnly: true
		// secure: true,
	});

	res.status(200).json({
		message: 'Register Successfully! Check your email to verify your account'
	});
});

const verifyAccount = asyncHandler(async (req, res, next) => {
	const { verifiedtoken } = req.body;

	const userId = getUserIdFromUIDCookie(req.UID, prefixRegister, next);
	const user = await Users.findOne({ _id: userId });
	if (user === null) return next(new ErrorHandler('Verify session error', 404));

	if (user.verifiedtoken == verifiedtoken) {
		await Users.updateOne({ _id: user._id }, { active: true });
		res.clearCookie('UID');
		res.status(200).json({
			message: 'Verify Successfully! You can login now'
		});
	} else {
		return next(new ErrorHandler('Token is incorrect', 404));
	}
});

const loginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await Users.findOne({ email });

	if (user && user.active) {
		if (await user.matchPassword(password)) {
			res.cookie('token', generateJWT(user._id), {
				signed: true,
				httpOnly: true
				// secure: true,
			});
			res.status(200).json({
				avatar: user.avatar,
				banner: user.banner,
				name: user.name
			});
		} else {
			return next(new ErrorHandler('Email not found or Incorrect Password', 404));
		}
	} else {
		return next(new ErrorHandler('Email not found or Incorrect Password', 404));
	}
});

const findUser = asyncHandler(async (req, res, next) => {
	const { search } = req.body;

	const users = await Users.find({
		$or: [
			{
				email: {
					$regex: search
				}
			},
			{
				name: {
					$regex: search
				}
			}
		]
	}).limit(10);

	res.status(200).json({
		users
	});
});

const forgotPassword = asyncHandler(async (req, res, next) => {
	const { email } = req.body;

	const verifiedtoken = randomNumber(100000, 999999);

	const user = await Users.findOneAndUpdate({ email }, { verifiedtoken: verifiedtoken });
	if (!user) return next(new ErrorHandler('Email not found', 404));

	if (constants.NODE_ENV !== 'DEVELOPMENT') {
		sendEmail(email, 'Reset your password', 'Veriry code: ' + verifiedtoken);
	}

	console.log('\x1b[36m%s\x1b[0m', 'Verified Token: ' + verifiedtoken);

	res.cookie('UID', encrypter.encrypt(prefixForgotPassword + user._id.toString()), {
		signed: true,
		httpOnly: true
	});
	res.status(200).json({
		message: 'Check your email to reset your password'
	});
});

const verifyToken = asyncHandler(async (req, res, next) => {
	const { verifiedtoken } = req.body;

	const userId = getUserIdFromUIDCookie(req.UID, prefixForgotPassword, next);
	const user = await Users.findOne({ _id: userId });
	if (!user) return next(new ErrorHandler('Validate session error', 404));

	if (user.verifiedtoken == verifiedtoken) {
		res.cookie('UID', encrypter.encrypt(prefixResetPasswordToken + user._id.toString()), {
			signed: true,
			httpOnly: true
			// secure: true,
		});
		res.status(200).json({
			message: 'Verified Successfully! You can reset your password now'
		});
	} else {
		return next(new ErrorHandler('Token is incorrect', 404));
	}
});

const resetPassword = asyncHandler(async (req, res, next) => {
	const { password } = req.body;

	const userId = getUserIdFromUIDCookie(req.UID, prefixResetPasswordToken, next);
	const hashedPassword = bcrypt.hashSync(password);
	const user = await Users.findOneAndUpdate({ _id: userId }, { password: hashedPassword });
	if (!user) return next(new ErrorHandler('Validate session error', 404));

	res.clearCookie('UID');
	res.status(200).json({
		message: 'Reset password successfully'
	});
});

const updateProfile = asyncHandler(async (req, res, next) => {
	const { avatar, name, gender, dob } = req.body;

	const user = await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, name, gender, dob });
	if (!user) return next(new ErrorHandler('User not found', 404));

	res.status(200).json({
		avatar,
		name,
		gender,
		dob,
		email: user.email
	});
});

const getUserProfile = asyncHandler(async (req, res, next) => {
	const userId = req.params.userId ?? req.user._id;
	const user = await Users.findById(userId);
	if (!user) return next(new ErrorHandler('Get profile failed', 404));

	res.status(200).json({
		avatar: user.avatar,
		banner: user.banner,
		name: user.name,
		email: user.email,
		gender: user.gender,
		dob: user.dob
	});
});

const updatePassword = asyncHandler(async (req, res, next) => {
	const { password } = req.body;

	const hashedPassword = bcrypt.hashSync(password);
	const user = await Users.findOneAndUpdate({ _id: req.user._id }, { password: hashedPassword });
	if (!user) return next(new ErrorHandler('Update password failed', 404));

	res.status(200).json({
		message: 'Update password successfully'
	});
});

module.exports = {
	registerUser,
	loginUser,
	findUser,
	forgotPassword,
	verifyAccount,
	verifyToken,
	resetPassword,
	updateProfile,
	getUserProfile,
	updatePassword
};
