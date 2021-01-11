const { User } = require("../models/user");

const getAllAuthSupervisor = async (req, res) => {
  const supervisor = await User.find({
    category: "SUPERVISOR",
    supervisorPerm: true,
  }).select("-password -category");
  res.send(supervisor);
};
const getAllReqSupervisor = async (req, res) => {
  const supervisor = await User.find({
    category: "SUPERVISOR",
    supervisorPerm: false,
  }).select("-password -category");
  res.send(supervisor);
};

// const getSupervisor = async (req, res) => {
//   const supervisor = await User.findOne({
//     _id: req.params.id,
//     category: "SUPERVISOR",
//   }).select("-password -category");
//   if (!supervisor) return res.status(400).send("Invalid Supervisor Id");
//   res.send(supervisor);
// };

const removeSupervisor = async (req, res) => {
  const supervisor = await User.findOne({
    _id: req.params.id,
    category: "SUPERVISOR",
  });
  if (!supervisor) return res.status(400).send("Invalid Supervisor Id");
  await supervisor.remove();
  res.send("Supervisor removed successfully");
};

const updateSupervisorPerm = async (req, res) => {
  const { id, status } = req.body;
  const supervisor = await User.findOneAndUpdate(
    { _id: id, category: "SUPERVISOR" },
    { supervisorPerm: status }
  );
  if (!supervisor) return res.status(400).send("Invalid Supervisor Id");
  res.send("Supervisor Permission Updated");
};

module.exports = {
  removeSupervisor,
  //getSupervisor,
  getAllAuthSupervisor,
  getAllReqSupervisor,
  updateSupervisorPerm,
};
