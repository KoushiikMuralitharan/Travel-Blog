const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The username is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "The email is required."],
    },
    password: {
      type: String,
      required: [true, "The password is required."],
      minlength: [4, "The password is too short."],
      maxlength: [200, "The password is too large."],
    },
    role: {
      type: String,
      default: "visitor",
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userDetailsSchema);
module.exports = User;
