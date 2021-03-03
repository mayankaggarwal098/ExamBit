const express = require("express");
const router = express.Router();
const result = require("../services/result");
const auth = require("../middleware/auth");
const supervisorAuth = require("../middleware/supervisorAuth");

router.post("/generateresult", auth, result.generateResult);
router.post("/generateresult/pdf", auth, result.generateResultPdf);
router.post("/all/score", auth, result.getScore);
router.post("/edit/score", auth, supervisorAuth, result.editScore);
router.post("/student/all", auth, result.getStudentResults);
router.post("/students/rank", auth, result.getRankList);
router.post("/download", auth, supervisorAuth, result.download);
module.exports = router;
