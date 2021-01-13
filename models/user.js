const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  supervisorPerm: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

// exports.User = User;
// exports.validateSignup = validateUserSignup;
// exports.validateSignin = validateUserSignin;

module.exports = User;
