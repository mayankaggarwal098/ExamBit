const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestPaper",
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
