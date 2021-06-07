const mongoose = require("mongoose");
//particular option in a question
const optionSchema = new mongoose.Schema({
  optionBody: {
    type: String,
    required: true,
  },
  isAnswer: {
    type: Boolean,
    default: false,
  },
});
const Options = mongoose.model("Options", optionSchema);
module.exports = Options;
