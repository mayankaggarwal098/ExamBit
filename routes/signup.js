const { User, validateSignup, validateSignin } = require("../models/user");
const { jwtPrivateKey, SENDGRID_API_KEY, EMAIL } = require("../config/keys");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password, type } = req.body;

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({ name, email, password, type });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send("Successfully signed up");
});

module.exports = router;
