const express = require("express");
const router = express.Router();
const result = require("../services/result");

router.post("/generateresult", result.generateResult);
router.post("/all", result.getAllResults);
router.post("/details", result.getDetailedResult);
router.post("/download", result.download);
module.exports = router;
