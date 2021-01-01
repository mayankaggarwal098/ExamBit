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
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isRegistrationAvailable: {
    type: Boolean,
    required: true,
    default: false
  },
  isTestConducted: {
    type: Boolean,
    required: true,
    default: false
  },
  isResultGenerated: {
    type: Boolean,
    required: true,
    default: false
  },
});

const TestPaper = mongoose.model("TestPaper", testSchema);
module.exports = TestPaper;
