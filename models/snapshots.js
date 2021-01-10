const mongoose = require("mongoose");

const snapShotSchema = new mongoose.Schema({
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
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

const Snapshots = mongoose.model("Snapshots", snapShotSchema);
module.exports = Snapshots;
