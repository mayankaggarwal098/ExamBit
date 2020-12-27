module.exports = async function (req, res, next) {
  if (req.user.category !== "SUPERVISOR") {
    return res.status(401).send("Permission not granted");
  }
  next();
};
