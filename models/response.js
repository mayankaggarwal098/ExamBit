const mongoose = require("mongoose");
//Response of a student for a particular question
const responseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  chosenOption: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Options",
    },
  ],
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestPaper",
  },
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
