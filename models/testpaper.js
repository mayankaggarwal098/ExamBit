const { string } = require("joi");
const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        // required: true,
      },
    ],
    pdf: {
      type: String,
      //required: true,
    },
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
      // required: true,
      default: false,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    isRegistrationAvailable: {
      type: Boolean,
      //  required: true,
      default: false,
    },
    isTestConducted: {
      type: Boolean,
      //   required: true,
      default: false,
    },
    // isResultGenerated: {
    //   type: Boolean,
    //   //   required: true,
    //   default: false,
    // },
    isSnapshots: {
      type: Boolean,
      default: false,
    },
    //New Properties added which determine the paper type( interview or group test)
    paperType: {
      type: String,
      required: true,
    },
    isAudioRec: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const TestPaper = mongoose.model("TestPaper", testSchema);
module.exports = TestPaper;
