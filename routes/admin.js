const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const admin = require("../services/admin");

router.get("/auth/details/all", auth, adminAuth, admin.getAllAuthSupervisor);
router.get("/request/details/all", auth, adminAuth, admin.getAllReqSupervisor);
//router.get("/details/:id", auth, adminAuth, admin.getSupervisor);
router.delete("/remove/:id", auth, adminAuth, admin.removeSupervisor);
router.post("/change/permission", auth, adminAuth, admin.updateSupervisorPerm);

module.exports = router;
