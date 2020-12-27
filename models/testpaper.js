const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  subject: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  isTestBegins: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isRegistrationAvailable: {
    type: Boolean,
    required: true,
  },
  isTestConducted: {
    type: Boolean,
    required: true,
  },
  isResultGenerated: {
    type: Boolean,
    required: true,
  },
});

const TestPaper = mongoose.model("TestPaper", testSchema);
module.exports = TestPaper;
