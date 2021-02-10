const mongoose = require("mongoose");

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
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
