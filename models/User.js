const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
    default: "/img/user-avatars/user.png",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
