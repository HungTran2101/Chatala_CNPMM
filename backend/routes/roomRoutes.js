const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { getRoomList, getRoomInfo } = require("../controllers/roomControllers");

const router = express.Router();

router.route("/").get(authMiddleware, getRoomList);
router.route("/:roomId").get(authMiddleware, getRoomInfo);

module.exports = router;
