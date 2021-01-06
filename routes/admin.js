const express = require("express");
const router = express.Router();

const admin = require("../services/admin");

router.get("/auth/details/all", admin.getAllAuthSupervisor);
router.get("/request/details/all", admin.getAllReqSupervisor);
router.get("/details/:id", admin.getSupervisor);
router.delete("/remove/:id", admin.removeSupervisor);
router.post("/change/permission", admin.updateSupervisorPerm);

module.exports = router;
