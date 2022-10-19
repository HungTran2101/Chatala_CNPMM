const mongoose = require("mongoose");
const { COLLECTION_NOTIFICATIONS } = require("../config/db");

const notificationSchema = mongoose.Schema(
  {
    receiveId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    status: { type: String, default: "Pending" }, //Pending, Accepted, Denied
  },
  { timestamps: true }
);

const Notifications = mongoose.model(
  "Notifications",
  notificationSchema,
  COLLECTION_NOTIFICATIONS
);

module.exports = Notifications;
