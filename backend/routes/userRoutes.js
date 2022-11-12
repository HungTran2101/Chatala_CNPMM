const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  findUser,
  verifyAccount,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify").post(verifyAccount, findUser);
router.route("/find").post(authMiddleware, findUser);

module.exports = router;
