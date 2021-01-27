const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const resultSchema = new mongoose.Schema({
  testId: {
    type: ObjectId,
    ref: "TestPaper",
    required: true,
  },
  studentId: {
    type: ObjectId,
    ref: "Student",
    required: true,
  },
  responseSheet: {
    type: ObjectId,
    ref: "ResponseSheet",
    // required: true,
  },
  subResult: [
    {
      type: ObjectId,
      ref: "SubResult",
      //  required: true,
    },
  ],
  score: {
    type: Number,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
