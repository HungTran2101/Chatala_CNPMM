const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const { generateJWT, randomNumber } = require("../utils/utilFunctions");
const ErrorHandler = require("../utils/errorHandler");
const { sendEmail, send } = require("../utils/mailer");
const crypto = require('crypto');

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body;

  const otp = randomNumber(100000, 999999);

  const newUser = await Users.create({
    name,
    email,
    password,
    otp,
  });

  sendEmail(email, "Verify your account", "Veriry code: " + otp).catch(() => {
    Users.deleteOne({ _id: newUser._id });
  });

  res.status(200).json({
    message: "Register Successfully! Check your email to verify your account",
  });
  
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (user) {
    if (await user.matchPassword(password)) {
      res.cookie("token", generateJWT(user._id), {
        signed: true,
        httpOnly: true,
        // secure: true,
      });
      res.status(200).json({
        avatar: user.avatar,
        banner: user.banner,
        name: user.name,
      });
    } else {
      return next(
        new ErrorHandler("Email not found or Incorrect Password", 404)
      );
    }
  } else {
    return next(
      new ErrorHandler("Email not found or Incorrect Password", 404)
    );
  }
});

const findUser = asyncHandler(async (req, res, next) => {
  const { search } = req.body;

  const users = await Users.find({
    $or: [
      {
        email: {
          $regex: search,
        },
      },
      {
        name: {
          $regex: search,
        },
      },
    ],
  }).limit(10);

  res.status(200).json({
    users,
  });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
 
});

const verifyAccount = asyncHandler(async (req, res, next) => {
  const { otp, email } = req.body;

  const user = await Users.findOne({ email });
  if(user === null) return next(new ErrorHandler("Email not found", 404));

  if(user.otp === otp) {
    await Users.updateOne({ _id: user._id }, { active: true });
    res.status(200).json({
      message: "Verify Successfully! You can login now",
    })
  }else {
    return next(new ErrorHandler("Verify code is incorrect", 404));
  }
});

module.exports = { registerUser, loginUser, findUser, forgotPassword, verifyAccount };
