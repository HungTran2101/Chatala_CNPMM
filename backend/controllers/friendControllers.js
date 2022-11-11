const asyncHandler = require("express-async-handler");
const Notifications = require("../models/notificationModel");
const { decodeJWT } = require("../utils/utilFunctions");
const Friends = require("../models/friendModel");
const ObjectId = require("mongodb").ObjectId;

const friendReq = asyncHandler(async (req, res, next) => {
  const { id } = decodeJWT(req.signedCookies.token);
  const receiveId = req.params.id;

  const notification = await Notifications.findOneAndUpdate(
    {
      receiveId: receiveId,
      requestId: id,
    },
    {
      $set: {
        status: "Pending",
      },
    }
  );

  !notification &&
    Notifications.create({
      receiveId: receiveId,
      requestId: id,
    });

  res.status(200).json({
    message: "Request successfully",
  });
});

const friendAccept = asyncHandler(async (req, res, next) => {
  const notificationId = req.params.id;

  const notification = await Notifications.findOneAndUpdate(
    notificationId,
    {
      $set: {
        status: "Accepted",
      },
    },
    { new: true }
  );

  await Friends.findOneAndUpdate(
    {
      $or: [
        {
          uid1: notification.requestId,
          uid2: notification.receiveId,
        },
        {
          uid1: notification.receiveId,
          uid2: notification.requestId,
        },
      ],
    },
    {
      uid1: notification.requestId,
      uid2: notification.receiveId,
      $set: {
        status: {
          type: "available",
          blockedId: undefined,
        },
      },
    },
    { upsert: true }
  );

  res.status(200).json({
    message: "Accept successfully",
  });
});

const friendDecline = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await Notifications.findOneAndUpdate(id, {
    $set: {
      status: "Denied",
    },
  });

  res.status(200).json({
    message: "Decline successfully",
  });
});

const block = asyncHandler(async (req, res, next) => {
  const { id } = decodeJWT(req.signedCookies.token);
  const uid2 = req.params.id;

  const friend = await Friends.findOne({
    $or: [
      {
        uid1: id,
        uid2: uid2,
      },
      {
        uid1: uid2,
        uid2: id,
      },
    ],
  });

  if (!friend) {
    await Friends.create({
      uid1: id,
      uid2: uid2,
      status: {
        type: "oneWayBlock",
        blockedId: uid2,
      },
    });
    return res.status(200).json({
      message: "Block successfully",
    });
  } else {
    if (
      friend.status &&
      friend.status.type === "oneWayBlock" &&
      friend.status.blockedId.toString() === id
    ) {
      await Friends.findByIdAndUpdate(
        friend.id,
        {
          $set: {
            status: { type: "twoWayBlock", blockedId: undefined },
          },
        },
        { new: true }
      );
    }
    if (friend.status && friend.status.type === "available") {
      await Friends.findByIdAndUpdate(
        friend.id,
        {
          $set: {
            status: { type: "oneWayBlock", blockedId: uid2 },
          },
        },
        { new: true }
      );
    }
  }

  return res.status(200).json({
    message: "Block successfully",
  });
});

const unblock = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await Notifications.findOneAndUpdate(id, {
    $set: {
      status: "Denied",
    },
  });

  res.status(200).json({
    message: "Unblock successfully",
  });
});

module.exports = { friendReq, friendAccept, friendDecline, block, unblock };
