const mongoose = require("mongoose");
const { COLLECTION_USERS } = require("../config/db");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    banner: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    name: { type: String, required: [true, "Name is missing"], trim: true },
    password: {
      type: String,
      required: [true, "Password is missing"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Password is missing"],
      trim: true,
      unique: [true, "Phone number existed"],
    },
    gender: { type: String, default: "male" },
    dob: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password) {
  const user = await Users.findOne({phone: this.phone}).select("password")
  return bcrypt.compareSync(password, user.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) next();

  this.password = await bcrypt.hashSync(this.password);
});

const Users = mongoose.model("Users", userSchema, COLLECTION_USERS);

module.exports = Users;
