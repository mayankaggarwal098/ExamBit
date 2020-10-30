const mongoose = require('mongoose');

// SCHEMA OF SUBJECTIVE QUESTION
const subjective = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        default: 1,
        required: true
    }
}, { timestamps: true })

module.exports = subjective