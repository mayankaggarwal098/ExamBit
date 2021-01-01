const express = require("express");
const router = express.Router();
const student = require("../services/student");

router.post("/register", student.registerStudent);

module.exports = router;
