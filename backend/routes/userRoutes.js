const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  findUser,
  verifyAccount,
  forgotPassword,
  verifyToken,
  resetPassword,
  updateProfile,
  getUserProfile,
  updatePassword
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/register/verify-account").post(verifyAccount);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/forgot-password/verify-token").post(verifyToken);
router.route("/forgot-password/reset-password").post(resetPassword);
router.route("/find").post(authMiddleware, findUser);
router.route("/update-profile").post(authMiddleware, updateProfile);
router.route("/profile").get(authMiddleware, getUserProfile);
router.route("/update-password").post(authMiddleware, updatePassword);
router.route("/:userId/profile").get(getUserProfile);

module.exports = router;
