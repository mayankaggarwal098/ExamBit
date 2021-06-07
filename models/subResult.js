const mongoose = require("mongoose");
//Result of a particular question
const subResultSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  correctAnswer: {
    type: Array,
    required: true,
  },
  response: {
    type: Array,
    required: true,
  },
  explaination: {
    type: String,

    default: "No explaination given",
  },
  weightage: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const SubResult = mongoose.model("SubResult", subResultSchema);
module.exports = SubResult;
