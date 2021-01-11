module.exports = function (req, res, next) {
  if (req.user.category !== "ADMIN") {
    return res.status(403).send("Access denied");
  }
  next();
};
