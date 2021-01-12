const Question = require("../models/question");
const Result = require("../models/result");
const { Student } = require("../models/studentRegistered");
const TestPaper = require("../models/testpaper");

const createEditTest = async (req, res) => {
  if (req.user.category !== "SUPERVISOR") {
    return res.status(401).send("Permission not granted");
  }
  const _id = req.body._id || null;
  const { title, selectQuestion } = req.body;
  if (_id != null) {
    await TestPaper.findOneAndUpdate({ _id }, { title, questions });
    res.send("Successfully Updated");
  } else {
    const { title, subject, duration, selectQuestion, isSnapshots } = req.body;

    let paper = new TestPaper({
      title,
      subject,
      questions: selectQuestion,
      duration,
      createdBy: req.user._id,
      isSnapshots,
    });
    paper = await paper.save();
    res.send(paper);
  }
};

const getTest = async (req, res) => {
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
  res.send(paper);
};

const getAllTests = async (req, res) => {
  const papers = await TestPaper.find({ createdBy: req.user._id })
    .populate("questions", "questionBody")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        //model: Options,
      },
    });
  res.send(papers);
};

const deleteTest = async (req, res) => {
  const paper = await TestPaper.findById(req.body.id);
  if (!paper) {
    return res.status(401).send("Invalid Test Paper Id");
  }
  await paper.remove();
  res.send("Test Paper Deleted Successfully");
};

const beginTest = async (req, res) => {
  const paper = await TestPaper.findOneAndUpdate(
    { _id: req.body.id, isTestConducted: false },
    { isTestBegins: true, isRegistrationAvailable: false },
    { new: true }
  );
  if (!paper) {
    return res.status(401).send("Unable to start test");
  }
  res.send(paper);
};

// const endTest = async (req, res) => {
//   const paper = await TestPaper.findOneAndUpdate(
//     { _id: req.body.id, isTestBegins: 1 },
//     { isTestBegins: false, isTestConducted: true, // isResultGenerated: true
// },
//     { new: true }
//   );
//   if (!paper) {
//     return res.status(401).send("Invalid request");
//   }
//   //pending excel download feature
//   res.send(paper);
// };

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
  if (!paper) res.status(404).send("Paper Not found");

  res.send(paper.isTestBegins);
};

const changeRegistrationStatus = async (req, res) => {
  const { id, status } = req.body;
  const paper = await TestPaper.find({
    _id: id,
    isTestConducted: false,
    isTestBegins: false,
  });
  if (!paper) {
    return res.status(401).send("Invalid Request");
  }
  await TestPaper.findByIdAndUpdate(
    { _id: id },
    { isRegistrationAvailable: status }
  );
  res.send("Registration status changed");
};

const getRegisteredStudents = async (req, res) => {
  const { testId } = req.body;
  const students = await Student.find({ testId });
  // if (students.length === 0) {
  //   return res.status(400).send("Invalid Test Id");
  // }

  res.send(students);
};

module.exports = {
  getRegisteredStudents,
  createEditTest,
  getTest,
  getAllTests,
  deleteTest,
  beginTest,
  checkTestStart,
  changeRegistrationStatus,
};
