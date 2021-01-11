const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  optionBody: {
    type: String,
    required: true,
  },
  isAnswer: {
    type: Boolean,
    //required: true,
    default: false,
  },
});
const Options = mongoose.model("Options", optionSchema);
module.exports = Options;
