const express = require("express");
const router = express.Router();
const snapshots = require("../services/snapshots");

router.post("/upload", snapshots.uploadImage);
router.post("/get/all", snapshots.getImages);

module.exports = router;
