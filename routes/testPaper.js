const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const test = require("../services/testpaper");

router.post("/create", auth, test.createEditTest);
router.get("/details/all", auth, test.getAllTests);
router.get("/details/:id", auth, test.getTest);
router.post("/delete", auth, test.deleteTest);
router.post("/begin", auth, test.beginTest);
router.post("/end", auth, test.endTest);
router.get("/maxmarks", auth, test.maxMarks);
router.get("/check-test-name", auth, test.checkTestName);
router.post("/change-registration-status", auth, test.changeRegistrationStatus);
module.exports = router;
