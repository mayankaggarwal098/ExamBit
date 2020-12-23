const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true
    },
    isAnswer : {
        type: Boolean,
        required: true,
        default: false
    }
})

exports.optionSchema = optionSchema;``