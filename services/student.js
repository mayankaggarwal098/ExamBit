const { Student, validateStudent } = require("../models/studentRegistered");
const TestPaper = require("../models/testpaper");
const Question = require("../models/question");
const Options = require("../models/options");
const { sendMail } = require("./sendMail");
const registerStudent = async (req, res) => {
  //   const { error } = validateStudent(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  const { name, email, phoneNum, testId } = req.body;

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
    `You have been successfully registered for the test. Click on the link given to take test  "${
      req.protocol + "://" + req.get("host")
    }/student/test?testid=${testId}&studentid=${student._id}"`
  );
  res.send("Successfully Registered Check your mail");
};

module.exports = { registerStudent };
