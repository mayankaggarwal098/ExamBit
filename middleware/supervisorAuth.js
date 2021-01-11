module.exports = function (req, res, next) {
  if (req.user.category !== "SUPERVISOR" || req.user.supervisorPerm === false) {
    return res.status(403).send("Permission not granted");
  }
  next();
};
