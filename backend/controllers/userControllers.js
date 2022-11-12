const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const { generateJWT, randomNumber } = require('../utils/utilFunctions');
const ErrorHandler = require('../utils/errorHandler');
const { sendEmail, send } = require('../utils/mailer');
const { Encrypter } = require('../utils/encrypter');
const constants = require('../constants');

const encrypter = new Encrypter();
const prefixRegister = 'register-';
const prefixForgotPassword = 'forgotPw-';
const prefixResetPasswordToken = 'resetPwToken-';

const registerUser = asyncHandler(async (req, res, next) => {
	const { name, password, email } = req.body;

	console.log(name, password, email);

	const verifiedtoken = randomNumber(100000, 999999);

	const newUser = await Users.create({
		name,
		email,
		password,
		verifiedtoken
	});

	console.log('every thing is ok?');

	if (constants.NODE_ENV !== 'DEVELOPMENT') {
		sendEmail(email, 'Verify your account', 'Verified Token: ' + verifiedtoken).catch(() => {
			Users.deleteOne({ _id: newUser._id });
		});
	}
	
	console.log('\x1b[36m%s\x1b[0m', 'Verified Token: ' + verifiedtoken);

	const encryptedUID = encrypter.encrypt(prefixRegister + newUser._id.toString());
	res.cookie('UID', encryptedUID);

	res.status(200).json({
		message: 'Register Successfully! Check your email to verify your account'
	});
});

const verifyAccount = asyncHandler(async (req, res, next) => {
	const { verifiedtoken } = req.body;

	const { UID } = req.cookies;
	if (!UID) {
		throw new ErrorHandler(401, 'Unauthorized');
	}

	const userId = getUserIdFromToken(UID, prefixRegister);
	const user = await Users.findOne({ _id: userId });
	if (user === null) return next(new ErrorHandler('Verify session error', 404));

	console.log(user.verifiedtoken, verifiedtoken);

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

	const user = await Users.findOne({ email });
	if (!user) return next(new ErrorHandler('Email not found', 404));

	const verifiedtoken = randomNumber(100000, 999999);
	await Users.updateOne({ _id: user._id, verifiedtoken: verifiedtoken });

	sendEmail(email, 'Reset your password', 'Veriry code: ' + verifiedtoken);

	res.cookie('UID', encrypter.encrypt(prefixForgotPassword + user._id.toString()));
	res.status(200).json({
		message: 'Check your email to reset your password'
	});
});

const verifyToken = asyncHandler(async (req, res, next) => {
	const { verifiedtoken } = req.body;
	const { UID } = req.cookies;

	const userId = getUserIdFromToken(UID, prefixForgotPassword);
	const user = await Users.findOne({ _id: userId });
	if (!user) return next(new ErrorHandler('Validate session error', 404));

	if (user.verifiedtoken == verifiedtoken) {
		res.cookie('UID', encrypter.encrypt(prefixResetPasswordToken + user._id.toString()));
		res.status(200).json({
			message: 'Token is correct'
		});
	} else {
		return next(new ErrorHandler('Token is incorrect', 404));
	}
});

const resetPassword = asyncHandler(async (req, res, next) => {
	const { password } = req.body;
	const { UID } = req.cookies;

	const userId = getUserIdFromToken(UID, prefixResetPasswordToken);
	const user = await Users.findOne({ _id: userId });
	if (!user) return next(new ErrorHandler('Validate session error', 404));

	await Users.updateOne({ _id: user._id }, { password: password });

	res.clearCookie('UID');
	res.status(200).json({
		message: 'Reset password successfully'
	});
});

const getUserIdFromToken = (token, prefix) => {
	try {
		const dencrypt = encrypter.dencrypt(token);
		const userId = dencrypt.replace(prefix, '');

		if (!userId) return next(new ErrorHandler('Validate session error', 404));

		return userId;
	} catch (err) {
		return next(new ErrorHandler('Validate session error', 404));
	}
};

module.exports = { registerUser, loginUser, findUser, forgotPassword, verifyAccount, verifyToken, resetPassword };
