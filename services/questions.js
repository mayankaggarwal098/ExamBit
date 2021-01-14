const Question = require("../models/question");
const Options = require("../models/options");
const auth = require("../middleware/auth");
const { validateQuestionCreate } = require("./validation");

const createQuestion = async (req, res) => {
  // if (req.user.category !== "SUPERVISOR") {
  //   return res.status(401).send("Permission not granted");
  // }

  const { error } = validateQuestionCreate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
  // if (req.user.category !== "SUPERVISOR") {
  //   return res.status(401).send("Permission not granted");
  // }

  const ques = await Question.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    { isDeleted: true }
  );
  if (!ques) {
    return res.status(404).send("Question does not exist");
  }

  // await Options.deleteMany({ _id: ques.options });
  // await ques.remove();
  res.send("Deleted Successfully");
};

const getAllQuestions = async (req, res) => {
  // if (req.user.category !== "SUPERVISOR") {
  //   return res.status(401).send("Permission not granted");
  // }
  // const { subject } = req.body;
  // if (subject.length !== 0) {
  //   const allques = await Question.find({ subject }).populate(
  //     "createdBy options"
  //   );
  //   res.send(allques);
  // } else {
  const allques = await Question.find({
    createdBy: req.user._id,
    isDeleted: false,
  })
    .populate("options")
    .sort("-createdAt")
    .select("-createdAt");
  res.send(allques);
  // }
};

const getSingleQuestion = async (req, res) => {
  // if (req.user.category !== "SUPERVISOR") {
  //   return res.status(401).send("Permission not granted");
  // }
  //const { _id } = req.params;
  const ques = await Question.find({
    _id: req.params.id,
    isDeleted: false,
  }).populate("options");

  if (!ques) {
    return res.status(404).send("Question not found");
  }
  res.send(ques);
};

const searchQuestion = async (req, res) => {
  const pattern = new RegExp("^" + req.body.query);
  const questions = await Question.find({
    subject: { $regex: pattern, $options: "i" },
    isDeleted: false,
    createdBy: req.user._id,
  })
    .populate("options")
    .sort("-createdAt")
    .select("-createdAt");
  res.send(questions);
};

module.exports = {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getSingleQuestion,
  searchQuestion,
};
