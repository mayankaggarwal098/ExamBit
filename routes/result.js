const express = require("express");
const router = express.Router();
const result = require("../services/result");

router.post("/finalresult", result.generateResult);
module.exports = router;
