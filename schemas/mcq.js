const Joi = require('joi');
const mongoose = require('mongoose');

// SCHEMA OF MULTIPLE CHOICE QUESTION
const mcqSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const MCQ = mongoose.model('MCQ', mcqSchema);

function validateMCQ( mcq) {

    const schema = Joi.object({
        question: Joi.string().required(),
        option1: Joi.string().required(),
        option2: Joi.string().required(),
        option3: Joi.string().required(),
        option4: Joi.string().required(),
        solution: Joi.string().required(),
        marks: Joi.number().required()
    })

    return schema.validate(mcq);
}

exports.mcqSchema = mcqSchema;
exports.MCQ = MCQ
exports.validateMCQ = validateMCQ