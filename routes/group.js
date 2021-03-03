const express = require("express");
const auth = require("../middleware/auth");
const supervisorAuth = require("../middleware/supervisorAuth");
const {
  createGroup,
  getAllGroup,
  joinGroup,
  getStudentsInsideGroup,
  getTestPaperInsideGroup,
} = require("../services/group");

const router = express.Router();

router.get("/allgroup", auth, getAllGroup);
router.post("/create-group", auth, supervisorAuth, createGroup);
router.post("/join-group", auth, joinGroup);
router.post("/students", auth, getStudentsInsideGroup);
router.post("/tests", auth, getTestPaperInsideGroup);

module.exports = router;
