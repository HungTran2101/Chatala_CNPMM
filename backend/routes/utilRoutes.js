const express = require("express");
const { signedFileUrl } = require("../controllers/utilControllers");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.route("/signedFileUrl").get(authMiddleware, signedFileUrl);
router.route("/test").get(async (req, res, next) => {});
module.exports = router;
