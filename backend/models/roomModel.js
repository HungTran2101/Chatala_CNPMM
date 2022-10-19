const mongoose = require("mongoose");
const { COLLECTION_ROOMS } = require("../config/db");

const roomSchema = mongoose.Schema(
  {
    roomName: { type: String, trim: true },
    isGroup: { type: Boolean, default: false },
    users: [
      {
        uid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        role: { type: Boolean },
      },
    ],
    lastMsg: { type: mongoose.Schema.Types.ObjectId, ref: "Messages" },
  },
  { timestamps: true }
);

const Rooms = mongoose.model("Rooms", roomSchema, COLLECTION_ROOMS);

module.exports = Rooms;