const { User, validateSignup, validateSignin } = require("../models/user");
const { jwtPrivateKey, SENDGRID_API_KEY, EMAIL } = require("../config/keys");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  if (user.type === "SUPERVISOR" && user.supervisorPerm === false) {
    return res.status(403).send("Access Denied");
  }

  const token = jwt.sign({ _id: user._id }, jwtPrivateKey);

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
    },
  });
});

module.exports = router;
