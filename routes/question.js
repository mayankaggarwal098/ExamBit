const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const questions = require("../services/questions");
const supervisorAuth = require("../middleware/supervisorAuth");

router.post("/create", auth, supervisorAuth, questions.createQuestion);
router.get("/details/all", auth, supervisorAuth, questions.getAllQuestions);
router.get("/details/:id", auth, supervisorAuth, questions.getSingleQuestion);
router.delete("/delete/:id", auth, supervisorAuth, questions.deleteQuestion);
module.exports = router;
