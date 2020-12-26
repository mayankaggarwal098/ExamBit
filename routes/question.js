const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const questions = require("../services/questions");

router.post("/create", auth, questions.createQuestion);
router.post("/details/all", auth, questions.getAllQuestions);
router.get("/details/:_id", auth, questions.getSingleQuestion);
router.post("/delete", auth, questions.deleteQuestion);

module.exports = router;
