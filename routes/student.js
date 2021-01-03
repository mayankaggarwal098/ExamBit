const express = require("express");
const router = express.Router();
const student = require("../services/student");

router.post("/register", student.registerStudent);
router.post("/questions", student.getTestQuestions);
router.post("/responseSheet", student.responseSheet);
router.post("/updateResponse", student.updateResponse);
router.post("/endTest", student.endTest);
router.post("/details", student.getStudent);

module.exports = router;
