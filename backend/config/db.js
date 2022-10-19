const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

const COLLECTION_USERS = "Users";
const COLLECTION_MESSAGES = "Messages";
const COLLECTION_ROOMS = "Rooms";
const COLLECTION_FRIENDS = "Friends";
const COLLECTION_NOTIFICATIONS = "Notifications";

module.exports = {
  connectDB,
  COLLECTION_USERS,
  COLLECTION_MESSAGES,
  COLLECTION_ROOMS,
  COLLECTION_FRIENDS,
  COLLECTION_NOTIFICATIONS
};
