const express = require("express");
const router = express.Router();
const student = require("../services/student");

router.post("/register", student.registerStudent);
router.post("/questions", student.getTestQuestions);
router.post("/responseSheet", student.responseSheet);
router.post("/updateResponse", student.updateResponse);
router.post("/endTest", student.endTest);
router.post("/details", student.getStudent);
router.post("/test/start-time", student.getTestStartTime);
router.post("/test/category", student.getTestCategory);
router.post("/pdf/upload", student.uploadPdfResponse);
router.post("/responseSheet/pdf", student.getResponsePdf);
//router.post("/test/pdf", student.getPdf);
module.exports = router;
