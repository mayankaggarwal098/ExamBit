const Question = require("../models/question");
const Result = require("../models/result");
const { Student } = require("../models/studentRegistered");
const TestPaper = require("../models/testpaper");
const { validateEditTest, validateCreateTest } = require("./validation");

const createEditTest = async (req, res) => {
  // if (req.user.category !== "SUPERVISOR") {
  //   return res.status(401).send("Permission not granted");
  // }
  const {
    title,
    subject,
    duration,
    selectedQuestions,
    isSnapshots,
    isAudioRec,
    startTime,
  } = req.body;
  const _id = req.body._id || null;
  if (_id != null) {
    const { error } = validateEditTest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const paper = await TestPaper.findOneAndUpdate(
      { _id },
      {
        title,
        questions: selectedQuestions,
        subject,
        duration,
        isSnapshots,
        startTime,
        isAudioRec,
      }
    );
    if (!paper) return res.status(404).send("Testpaper does not exists");

    res.send("Successfully Updated");
  } else {
    const { error } = validateCreateTest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let paper = new TestPaper({
      title,
      subject,
      questions: selectedQuestions,
      duration,
      createdBy: req.user._id,
      isSnapshots,
      startTime,
      isAudioRec,
    });
    paper = await paper.save();
    res.send(paper);
  }
};

const getDetailedTest = async (req, res) => {
  const paper = await TestPaper.findById(req.params.id)
    .populate("createdBy", "name")
    .populate("questions", "questionBody")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        model: Options,
      },
    });
  if (!paper) res.status(404).send("Testpaper does not exists");
  res.send(paper);
};

const getTest = async (req, res) => {
  const paper = await TestPaper.findById(req.params.id).select(
    "title subject duration isSnapshots questions startTime isAudioRec"
  );
  if (!paper) res.status(404).send("Testpaper does not exists");
  res.send(paper);
};

const getAllTests = async (req, res) => {
  const papers = await TestPaper.find({
    createdBy: req.user._id,
    isTestConducted: false,
  })
    .populate("questions", "questionBody")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        //model: Options,
      },
    })
    .select("-createdBy")
    .sort("-createdAt");
  res.send(papers);
};

const getAllTestsConducted = async (req, res) => {
  const papers = await TestPaper.find({
    createdBy: req.user._id,
    isTestConducted: true,
  })
    .populate("questions", "questionBody")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        //model: Options,
      },
    })
    .select("-createdBy")
    .sort("-createdAt");
  res.send(papers);
};

const deleteTest = async (req, res) => {
  const paper = await TestPaper.findById(req.body.id);
  if (!paper) {
    return res.status(404).send("Test paper does not exist");
  }
  await paper.remove();
  res.send("Test Paper Deleted Successfully");
};

const beginTest = async (req, res) => {
  const paper = await TestPaper.findOneAndUpdate(
    { _id: req.body.id, isTestConducted: false },
    { isTestBegins: true, isRegistrationAvailable: false }
    // { new: true }
  );
  if (!paper) {
    return res.status(404).send("Unable to start test");
  }
  //res.send(paper);
  res.send("Test Starts");
};

const endTest = async (req, res) => {
  const paper = await TestPaper.findOneAndUpdate(
    { _id: req.body.id, isTestBegins: 1 },
    {
      isTestBegins: false,
      isTestConducted: true, // isResultGenerated: true
    }
    // { new: true }
  );
  if (!paper) {
    return res.status(404).send("Unable to end test");
  }
  //res.send(paper);
  res.send("Test has ended");
};

// const maxMarks = async (req, res) => {
//   const paper = await TestPaper.findById(req.body.testId).populate("questions");
//   if (!paper) {
//     return res.status(401).send("Invalid Test Paper Id");
//   }
//   let marks = 0;
//   paper.questions.map((m) => {
//     marks += m.weightage;
//   });
//   res.send(marks);
// };

const checkTestStart = async (req, res) => {
  const { id } = req.body;
  const paper = await TestPaper.findById(id);
  if (!paper) res.status(404).send("Test Paper does not exist");

  res.send(paper.isTestBegins);
};

const changeRegistrationStatus = async (req, res) => {
  const { id, status } = req.body;
  const paper = await TestPaper.findOneAndUpdate(
    {
      _id: id,
      isTestConducted: false,
      isTestBegins: false,
    },
    { isRegistrationAvailable: status }
  );
  if (!paper) {
    return res.status(404).send("Unable to change Registration status");
  }
  // await TestPaper.findByIdAndUpdate(
  //   { _id: id },
  //   { isRegistrationAvailable: status }
  // );
  res.send("Registration status changed");
};

const getRegisteredStudents = async (req, res) => {
  const { testId } = req.body;
  const students = await Student.find({ testId }).sort("-createdAt");
  // if (students.length === 0) {
  //   return res.status(400).send("Invalid Test Id");
  // }

  res.send(students);
};

module.exports = {
  getRegisteredStudents,
  createEditTest,
  getDetailedTest,
  getAllTests,
  deleteTest,
  beginTest,
  checkTestStart,
  changeRegistrationStatus,
  endTest,
  getAllTestsConducted,
  getTest,
};
