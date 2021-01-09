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
    explaination,
  } = req.body;

  const op = await Options.insertMany(option);

  const rightAnswers = [];

  op.map((o) => {
    if (o.isAnswer) rightAnswers.push(o._id);
  });
  let data = new Question({
    questionBody,
    explaination,
    subject,
    options: op,
    createdBy: req.user._id,
    weightage,
    rightAnswers,
  });
  data = await data.save();
  res.send(data);
};

const deleteQuestion = async (req, res) => {

  if (req.user.category !== "SUPERVISOR") {
    return res.status(401).send("Permission not granted");
  }

  const ques = await Question.findById(req.params.id);
  if (!ques) {
    return res.status(400).send("Invalid Question Id");
  }

  await Options.deleteMany({_id: ques.options})
  await ques.remove();
  res.send("Deleted Successfully");
};

const getAllQuestions = async (req, res) => {
  if (req.user.category !== "SUPERVISOR") {
    return res.status(401).send("Permission not granted");
  }
  // const { subject } = req.body;
  // if (subject.length !== 0) {
  //   const allques = await Question.find({ subject }).populate(
  //     "createdBy options"
  //   );
  //   res.send(allques);
  // } else {
    const allques = await Question.find({ createdBy: req.user._id}).populate("createdBy options");
    res.send(allques);
  // }
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
