const mongoose = require("mongoose");
const { COLLECTION_FRIENDS } = require("../config/db");

const friendSchema = mongoose.Schema(
  {
    uid1: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    uid2: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    status: {
      type: { type: String, default: "available" }, // available, oneWayBlock, twoWayBlock
      blockedId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    },
  },
  { timestamps: true }
);

const Friends = mongoose.model("Friends", friendSchema, COLLECTION_FRIENDS);

module.exports = Friends;
