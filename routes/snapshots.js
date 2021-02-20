const express = require("express");
const router = express.Router();
const snapshots = require("../services/snapshots");
const supervisorAuth = require("../middleware/supervisorAuth");
const auth = require("../middleware/auth");

router.post("/upload", auth, snapshots.uploadImage);
router.post("/get/all", auth, supervisorAuth, snapshots.getImages);

module.exports = router;
