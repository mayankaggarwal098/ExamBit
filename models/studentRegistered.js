const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestPaper",
  },
});

const Student = mongoose.model("Student", studentSchema);

function validateStudent(student) {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    name: Joi.string().max(255).required(),
    phoneNum: Joi.string().max(13).required(),
  });
  return schema.validate(student);
}

module.exports = { Student, validateStudent };
