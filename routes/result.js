const express = require("express");
const router = express.Router();
const result = require("../services/result");
const auth = require("../middleware/auth");
const supervisorAuth = require("../middleware/supervisorAuth");

router.post("/generateresult", result.generateResult);
//router.post("/all", result.getAllResults);
//router.post("/details", result.getDetailedResult);
router.post("/download", auth, supervisorAuth, result.download);
module.exports = router;
