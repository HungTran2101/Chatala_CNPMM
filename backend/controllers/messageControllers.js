const asyncHandler = require('express-async-handler');
const Messages = require('../models/messageModel');
const Rooms = require('../models/roomModel');
const { decodeJWT } = require('../utils/utilFunctions');

const { sendToClients } = require('../utils/NotificationService');

// save message
const sendMessage = asyncHandler(async (req, res, next) => {
  const { roomId, msg, files } = req.body;
  const { id } = decodeJWT(req.signedCookies.token);

  console.log(req.body);

  // const result = await Messages.create({
  //   roomId,
  //   senderId: id,
  //   msg,
  //   files,
  // });
  // if (result) {
  //   const lastMsg = msg !== '' ? msg : files[0].name;
  //   const room = await Rooms.findByIdAndUpdate(
  //     roomId,
  //     { lastMsg },
  //     { new: true }
  //   );

  //   sendToClients(room, msg, id);
  // }

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
