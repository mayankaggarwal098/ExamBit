const mongoose = require("mongoose");

const PdfSchema = mongoose.Schema({
  pdf: {
    type: String,
    required: true,
  },
});

const PdfModel = mongoose.model("PdfModel", PdfSchema);

module.exports = PdfModel;
