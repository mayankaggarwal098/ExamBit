const { User } = require("../models/user");
const Snapshots = require("../models/snapshots");
const AudioRec = require("../models/audio");

const getAllAuthSupervisor = async (req, res) => {
  const supervisor = await User.find({
    category: "SUPERVISOR",
    supervisorPerm: true,
  })
    .select("-password -category")
    .sort("-createdAt");
  res.send(supervisor);
};
const getAllReqSupervisor = async (req, res) => {
  const supervisor = await User.find({
    category: "SUPERVISOR",
    supervisorPerm: false,
  })
    .select("-password -category")
    .sort("-createdAt");
  res.send(supervisor);
};

const removeSupervisor = async (req, res) => {
  const supervisor = await User.findOne({
    _id: req.params.id,
    category: "SUPERVISOR",
  });
  if (!supervisor) return res.status(404).send("Supervisor Not Found");
  await supervisor.remove();
  res.send("Supervisor removed successfully");
};

const updateSupervisorPerm = async (req, res) => {
  const { id, status } = req.body;
  const supervisor = await User.findOneAndUpdate(
    { _id: id, category: "SUPERVISOR" },
    { supervisorPerm: status }
  );
  if (!supervisor) return res.status(404).send("Supervisor Not Found");
  res.send("Supervisor Permission Updated");
};

const deleteMedia = async (req, res) => {
  const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); //30 days
  //console.log(date);
  const snapshots = await Snapshots.deleteMany({ createdAt: { $lt: date } });
  const audioRec = await AudioRec.deleteMany({ createdAt: { $lt: date } });

  res.send("Snapshots and Audio Recordings Deleted Successfully");
};

module.exports = {
  removeSupervisor,

  getAllAuthSupervisor,
  getAllReqSupervisor,
  updateSupervisorPerm,
  deleteMedia,
};
