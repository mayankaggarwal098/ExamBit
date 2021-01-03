const express = require("express");
const router = express.Router();
const student = require("../services/student");

router.post("/register", student.registerStudent);
router.post("/questions", student.getTestQuestions);

module.exports = router;
