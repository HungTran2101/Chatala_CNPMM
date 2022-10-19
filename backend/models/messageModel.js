const mongoose = require("mongoose");
const { COLLECTION_MESSAGES } = require("../config/db");

const messageSchema = mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Rooms" },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    msg: { type: String, trim: true },
    imgs: [{ type: String}],
    files: [{type: mongoose.Schema.Types.Buffer, contentType: String}],
    unSend: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messageSchema, COLLECTION_MESSAGES);

module.exports = Messages;
