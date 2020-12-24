const mongoose = require("mongoose");
const Joi = require("joi");

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

function validateUserSignup(user) {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    category: Joi.string().required(),
  });
  return schema.validate(user);
}
function validateUserSignin(user) {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateSignup = validateUserSignup;
exports.validateSignin = validateUserSignin;
