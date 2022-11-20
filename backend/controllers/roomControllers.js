const asyncHandler = require('express-async-handler');
const Rooms = require('../models/roomModel');
const Messages = require('../models/messageModel');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose');
const Users = require('../models/userModel');
const { ObjectId } = require('mongodb');

const getRoomList = asyncHandler(async (req, res, next) => {
  const rooms = await Rooms.find({ 'users.uid': req.user._id });

  console.log(rooms);

  let result = [];
  if (rooms.length > 0) {
    rooms.forEach(room => {
      if (!room.isGroup) {
        let roomName =
          room.users[0].uid.toString() === req.user._id.toString()
            ? room.users[1].nickName
            : room.users[0].nickName;
        let roomAvatar =
          room.users[0].uid.toString() === req.user._id.toString()
            ? room.users[1].avatar
            : room.users[0].avatar;
        result.push({ roomName, roomAvatar, roomInfo: room });
      } else {
        result.push({
          roomName: room.groupName,
          roomAvatar:
            'https://res.cloudinary.com/vhg2901/image/upload/v1668091622/iaaqgtk4jhwe8hv2moi6.jpg',
          roomInfo: room,
        });
      }
    });

    res.status(200).json({
      result,
    });
  } else {
    return next(new ErrorHandler('Chat room not found!', 404));
  }
});

const getRoomInfo = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const roomInfo = await Rooms.findById({
    _id: mongoose.Types.ObjectId(roomId),
  });
  const messageList = await Messages.find({
    roomId: mongoose.Types.ObjectId(roomId),
  })
    .sort({ updatedAt: -1 })
    .limit(15);

  let messages = [];
  messageList.forEach(message => {
    if (message.senderId.toString() === req.user._id.toString()) {
      const temp = message.toJSON();
      const { senderId, ...rest } = temp;
      messages.push({ fromSender: true, ...rest });
    } else {
      const temp = message.toJSON();
      const { senderId, ...rest } = temp;
      messages.push({ fromSender: false, ...rest });
    }
  });

  let roomAvatar = roomInfo.users[0].avatar;
  let roomName = roomInfo.users[0].nickName;

  if (roomInfo.isGroup) {
    roomAvatar =
      'https://res.cloudinary.com/vhg2901/image/upload/v1668091622/iaaqgtk4jhwe8hv2moi6.jpg';
    roomName = roomInfo.groupName;
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
    return next(new ErrorHandler('Room not found!', 404));
  }
});

const getStatus = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;
  const room = await Rooms.findById(roomId);
  let friendID_Array = [];

  room.users.map(i => {
    friendID_Array.push(i.uid);
  });

  const ListFriends = await Users.find({ _id: { $in: friendID_Array } });

  let result = false;

  for (let i = 0; i < ListFriends.length; i++) {
    if (
      ListFriends.at(i).online === true &&
      ListFriends.at(i)._id.toString() !== req.user._id.toString()
    ) {
      result = true;
      break;
    }
  }

  res.json({ online: result });
});

const createGroup = asyncHandler(async (req, res) => {
  const data = req.body;

  const user = await Users.findOne({ _id: req.user._id });

  let groupName = '';
  let users = [];

  data.map(d => {
    groupName += d.name.toString() + ',';
    users.push({
      uid: ObjectId(d.id),
      nickName: d.name,
      avatar: d.avatar,
    });
  });

  groupName += user.name.toString();

  users.push({
    uid: user._id,
    nickName: user.name,
    avatar: user.avatar,
  });

  Rooms.create({
    groupName: groupName,
    isGroup: true,
    users: users,
    lastMsg: { text: '', senderId: '' },
  });

  res.json(true);
});

module.exports = { getRoomList, getRoomInfo, getStatus, createGroup };
