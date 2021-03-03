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
    ref: "User",
    required: true,
  },
  responseSheet: {
    type: ObjectId,
    ref: "ResponseSheet",
  },
  subResult: [
    {
      type: ObjectId,
      ref: "SubResult",
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
