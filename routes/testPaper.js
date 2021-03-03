const auth = require("../middleware/auth");
const supervisorAuth = require("../middleware/supervisorAuth");
const express = require("express");
const router = express.Router();

const test = require("../services/testpaper");

router.post("/create", auth, supervisorAuth, test.createEditTest);
router.get("/details/all", auth, supervisorAuth, test.getAllTests);
router.get(
  "/assignment/details/all",
  auth,
  supervisorAuth,
  test.getAllAssignments
);
router.get(
  "/conducted/details/all",
  auth,
  supervisorAuth,
  test.getAllTestsConducted
);
router.get(
  "/assignment/conducted/details/all",
  auth,
  supervisorAuth,
  test.getAllAssignmentsConducted
);
router.get("/details/:id", auth, supervisorAuth, test.getDetailedTest);
router.get("/get/:id", auth, supervisorAuth, test.getTest);
router.post("/delete", auth, supervisorAuth, test.deleteTest);
router.post("/begin", auth, supervisorAuth, test.beginTest);
router.post("/end", auth, supervisorAuth, test.endTest);
router.post("/check-test-start", test.checkTestStart);
router.post(
  "/change-registration-status",
  auth,
  supervisorAuth,
  test.changeRegistrationStatus
);
router.post("/students/all", auth, supervisorAuth, test.getRegisteredStudents);
module.exports = router;
