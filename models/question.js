const mongoose = require('mongoose');
const { optionSchema } = require('./options')

const questionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true
    },
    options: [ optionSchema ],
    weightage: {
        type: Number,
        required: true,
        default: 1
    },
    explanation: {
        type: String,
        required: true,
    }
})

const Question = mongoose.model('Question', questionSchema );

module.exports = Question