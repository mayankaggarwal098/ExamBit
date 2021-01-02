const Question = require("../models/question");
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
    const { title,subject, duration, selectQuestion } = req.body;

    const paper = new TestPaper({
      title,
      subject,
      questions: selectQuestion,
      duration,
      createdBy: req.user._id,
    });
    await paper.save();
    res.send(paper._id);
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
    .populate("questions")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        // model: Options,
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
    { isTestBegins: 1, isRegistrationAvailable: 0 },
    { new: true }
  );
  if (!paper) {
    return res.status(401).send("Unable to start test");
  }
  res.send(paper);
};

const endTest = async (req, res) => {
  const paper = await TestPaper.findOneAndUpdate(
    { _id: req.body.id, isTestBegins: 1 },
    { isTestBegins: false, isTestConducted: true, isResultGenerated: true },
    { new: true }
  );
  if (!paper) {
    return res.status(401).send("Invalid request");
  }
  //pending excel download feature
  res.send(paper);
};

const maxMarks = async (req, res) => {
  const paper = await TestPaper.findById(req.body.testId).populate("questions");
  if (!paper) {
    return res.status(401).send("Invalid Test Paper Id");
  }
  paper.questions.map((m) => {
    m += m.weightage;
  });
  res.send(m);
};

const checkTestName = async (req, res) => {
  const paper = await TestPaper.findOne({ title: req.body.testName });
  if (paper) {
    res.send(false);
  } else {
    res.send(true);
  }
};

module.exports = {
  createEditTest,
  getTest,
  getAllTests,
  deleteTest,
  beginTest,
  endTest,
  maxMarks,
  checkTestName,
};
