const asyncHandler = require("express-async-handler");
const Rooms = require("../models/roomModel");
const Messages = require("../models/messageModel");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

const getRoomList = asyncHandler(async (req, res, next) => {
  const rooms = await Rooms.find({ "users.uid": req.user._id });

  let result = [];
  if (rooms.length > 0) {
    rooms.forEach((room) => {
      if (!room.isGroup) {
        let roomName =
          room.users[0].uid === req.user._id
            ? room.users[1].nickName
            : room.users[0].nickName;
        let roomAvatar =
          room.users[0].uid === req.user._id
            ? room.users[1].avatar
            : room.users[0].avatar;
        result.push({ roomName, roomAvatar, room });
      }
    });

    res.status(200).json({
      result,
    });
  } else {
    return next(new ErrorHandler("Chat room not found!", 404));
  }
});

const getRoomInfo = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const roomInfo = await Rooms.findById({
    _id: mongoose.Types.ObjectId(roomId),
  });
  const messages = await Messages.find({
    roomId: mongoose.Types.ObjectId(roomId),
  });

  let roomAvatar = roomInfo.users[0].avatar;
  let roomName = roomInfo.users[0].nickName;

  if (roomInfo.isGroup) {
    roomAvatar = "";
    roomName = "";
  } else if (roomInfo.users[1].uid.toString() !== req.user._id.toString()) {
    roomAvatar = roomInfo.users[1].avatar;
    roomName = roomInfo.users[1].nickName;
  }

  if (roomInfo) {
    res.status(200).json({
      roomAvatar,
      roomName,
      roomInfo,
      messages,
    });
  } else {
    return next(new ErrorHandler("Room not found!", 404));
  }
});

module.exports = { getRoomList, getRoomInfo };
