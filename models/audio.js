const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestPaper",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  audioRec: [
    {
      type: String,
      required: true,
    },
  ],
});

const AudioRec = mongoose.model("AudioRec", audioSchema);
module.exports = AudioRec;
