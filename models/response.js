const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  questionId: {
    type: String,
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
    ref: "Student",
  },
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
