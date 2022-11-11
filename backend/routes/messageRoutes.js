const express = require("express");
const { sendMessage, unSendMessage, deleteMessage } = require("../controllers/messageControllers");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(authMiddleware, sendMessage);
router.route("/:msgId/unsend").put(authMiddleware, unSendMessage);
router.route("/:msgId/delete").delete(authMiddleware, deleteMessage);

module.exports = router;