const { User } = require("../models/user");
const { jwtPrivateKey } = require("../config/keys");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");
const { validateSignin } = require("../services/validation");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send("Invalid email or password");

  if (user.category === "SUPERVISOR" && user.supervisorPerm === false) {
    return res.status(403).send("Permission not granted");
  }

  const token = jwt.sign({ _id: user._id }, jwtPrivateKey);

  res.json({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    category: user.category,
  });
});

module.exports = router;
