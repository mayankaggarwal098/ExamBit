const { Student, validateStudent } = require("../models/studentRegistered");
const TestPaper = require("../models/testpaper");
const Question = require("../models/question");
const Options = require("../models/options");
const { sendMail } = require("./sendMail");
const ResponseSheet = require("../models/responseSheet");
const Response = require("../models/response");
const registerStudent = async (req, res) => {
  //   const { error } = validateStudent(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  const { name, email, phoneNum, link, testId } = req.body;

  const paper = await TestPaper.findOne({
    _id: testId,
    isRegistrationAvailable: true,
  });
  if (!paper)
    return res.status(422).send("Registration for this test has been closed");

  let student = await Student.findOne({ email, testId });
  if (student) return res.status(400).send("User already registered");

  student = new Student({ name, email, phoneNum, testId });
  await student.save();
  sendMail(
    email,
    "Registered Successfully",
    `You have been successfully registered for the test. Click on the link given to take test  "${link}student/test?testid=${testId}&studentid=${student._id}"`
  );
  res.send("Successfully Registered Check your mail");
};

const getTestQuestions = async (req, res) => {
  const paper = await TestPaper.findById(req.body.id)
    .populate("questions")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        //model: Options,
        select: { optionBody: 1 },
      },
    });

  if (!paper) return res.status(400).send("Invalid Test Id");
  res.send(paper);
};

const getStudent = async (req, res) => {
  const student = await Student.findById(req.body.id);
  if (!student) return res.status(400).send("Invalid Student Id");

  res.send(student);
};

const responseSheet = async (req, res) => {

  const { studentId, testId } = req.body;
  const student = await Student.findOne({ _id: studentId, testId });
  const paper = await TestPaper.findOne({
    _id: testId,
    isTestBegins: true,
    isTestConducted: false,
  });


  if (!student || !paper) return res.status(400).send("Invalid Request");

  let responseSheet = await ResponseSheet.findOne({ studentId, testId });

  if (responseSheet) return res.send(responseSheet);

  const questions = paper.questions;

  let responses = questions.map((id) => {
    return {
      questionId: id,
      chosenOption: [],
      studentId,
    };
  });
  responses = await Response.insertMany(responses);

  const startTime = new Date();
  responseSheet = new ResponseSheet({
    testId,
    studentId,
    questions,
    responses,
    startTime,
  });
  await responseSheet.save();
  res.send("Test Starts");
};

const updateResponse = async (req, res) => {
  const { testId, studentId, questionId, chosenOption } = req.body;
  const paper = await TestPaper.findById(testId);
  const responseSheet = await ResponseSheet.findOne({
    testId,
    studentId,
    isCompleted: false,
  });

  if (!paper || !responseSheet) return res.status(400).send("Invalid Request");
  const currentDate = new Date();
  const pendingTime =
    paper.duration * 60000 - (currentDate - responseSheet.startTime);
  if (pendingTime > 0) {
    const response = await Response.findOneAndUpdate(
      { questionId, studentId },
      { chosenOption }
    );
    if (!response) return res.status(400).send("Invalid Request");

    res.send("Response Updated");
  } else {
    const responseSheet = await ResponseSheet.findOneAndUpdate(
      { testId, studentId },
      { isCompleted: true }
    );
    if (!responseSheet) return res.status(400).send("Invalid Request");
    res.send("Time is up");
  }
};

const endTest = async (req, res) => {
  const { testId, studentId } = req.body;
  await ResponseSheet.findOneAndUpdate(
    { testId, studentId },
    { isCompleted: true }
  );
  res.send("Test Submitted Successfully");
};

module.exports = {
  updateResponse,
  endTest,
  responseSheet,
  getStudent,
  registerStudent,
  getTestQuestions,
};
