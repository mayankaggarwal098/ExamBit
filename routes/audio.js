const express = require("express");
const router = express.Router();
const audio = require("../services/audio");
const supervisorAuth = require("../middleware/supervisorAuth");
const auth = require("../middleware/auth");

router.post("/upload", auth, audio.uploadAudio);
router.post("/get/all", auth, supervisorAuth, audio.getAudio);

module.exports = router;
