const {mcqSchema} = require('./mcq')
const subjective = require('./subjective');
const mongoose = require('mongoose');
const Joi = require('joi');

// SCHEMA OF EXAM CONATINS MULTIPLE CHOICE QUESTION AND SUBJECTIVE QUESTION
const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    mcq: [mcqSchema],
    subjective: [subjective]
}, { timestamps: true })

const Exam = mongoose.model('Exam', examSchema);

function validateExam( exam ) {

    const schema = Joi.object({
        title: Joi.string().required(),
        courseCode: Joi.string().required(),
        description: Joi.string().required(),
        mcq:Joi.array().required(),
        subjective: Joi.array().required()
    })

    return schema.validate(exam);
}

exports.Exam = Exam;
exports.validateExam = validateExam;