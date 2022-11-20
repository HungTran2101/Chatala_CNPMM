const asyncHandler = require('express-async-handler');
const Messages = require('../models/messageModel');
const Rooms = require('../models/roomModel');
const { decodeJWT } = require('../utils/utilFunctions');

const { uploadImage } = require('../utils/uploadImage');

const { sendMessageToClients } = require('../utils/NotificationService');

// save message
const sendMessage = asyncHandler(async (req, res, next) => {
  const { roomId, msg, files } = req.body;

  const id = req.user._id;

  const UploadedLink = [];

  for (let i = 0; i < files.length; i++) {
    const str = await uploadImage(files[i]);
    UploadedLink.push({
      url: str,
      name: '',
      type: 'string',
    });
  }

  const result = await Messages.create({
    roomId,
    senderId: id,
    msg,
    files: UploadedLink,
  });
  if (result) {
    msg !== '' ? msg : 'Hình Ảnh';
    const lastMsg = {
      text: msg,
      senderId: id,
    };
    const room = await Rooms.findByIdAndUpdate(
      roomId,
      { lastMsg },
      { new: true }
    );

    sendMessageToClients(room, result, id);
  }

  res.status(200).json({
    result,
    message: 'Send Message Successfully!',
  });
});

const unSendMessage = asyncHandler(async (req, res, next) => {
  const { msgId } = req.params;

  const result = await Messages.findByIdAndUpdate(
    msgId,
    { unSend: true },
    { new: true }
  );

  res.status(200).json({
    result,
    message: 'unSend Message Successfully!',
  });
});

const deleteMessage = asyncHandler(async (req, res, next) => {
  const { msgId } = req.params;

  const result = await Messages.findByIdAndUpdate(
    msgId,
    { deleted: true },
    { new: true }
  );

  res.status(200).json({
    result,
    message: 'Delete Message Successfully!',
  });
});

module.exports = { sendMessage, unSendMessage, deleteMessage };
