const Question = require("../models/question");
const Options = require("../models/options");
const auth = require("../middleware/auth");

const createQuestion = async (req, res) => {
  if (req.user.category !== "SUPERVISOR") {
    return res.status(401).send("Permission not granted");
  }
  const {
    questionBody,
    options: option,
    subject,
    weightage,
    explanation,
  } = req.body;
  const op = await Options.insertMany(option);
  //console.log(op);
  const rightAnswers = [];
  op.map((o) => {
    if (o.isAnswer) rightAnswers.push(o._id);
  });
  const data = new Question({
    questionBody,
    explanation,
    subject,
    options: op,
    createdBy: req.user._id,
    weightage,
    rightAnswers,
  });
  await data.save();
  res.send("New question created");
};

const deleteQuestion = async (req, res) => {
  if (req.user.category !== "SUPERVISOR") {
    return res.status(401).send("Permission not granted");
  }
  const ques = await Question.findById(req.body._id);
  if (!ques) {
    return res.status(400).send("Invalid Question Id");
  }
  await ques.remove();
  res.send("Deleted Successfully");
};

const getAllQuestions = async (req, res) => {
  if (req.user.category !== "SUPERVISOR") {
    return res.status(401).send("Permission not granted");
  }
  const { subject } = req.body;
  if (subject.length !== 0) {
    const allques = await Question.find({ subject }).populate(
      "createdBy options"
    );
    res.send(allques);
  } else {
    const allques = await Question.find().populate("createdBy options");
    res.send(allques);
  }
};

const getSingleQuestion = async (req, res) => {
  if (req.user.category !== "SUPERVISOR") {
    return res.status(401).send("Permission not granted");
  }
  const { _id } = req.params;
  const ques = await Question.findById(_id).populate("createdBy options");

  if (!ques) {
    return res.status(401).send("Invalid Question id");
  }
  res.send(ques);
};

module.exports = {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getSingleQuestion,
};
