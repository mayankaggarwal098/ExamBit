const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const questions = require("../services/questions");

router.post("/create", auth, questions.createQuestion);
router.get("/details/all", auth, questions.getAllQuestions);
router.get("/details/:_id", auth, questions.getSingleQuestion);
router.delete("/delete/:id", auth, questions.deleteQuestion);
router.post(
  "/change-registration-status",
  auth,
  questions.changeRegistrationStatus
);

module.exports = router;
