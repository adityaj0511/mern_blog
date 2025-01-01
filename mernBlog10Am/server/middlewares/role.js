const CheckRole = (req, res, next) => {
  const { admin } = req.user;

  if (!admin) {
    return res.status(401).json({ msg: "Access denied" });
  }
  next();
};

module.exports = CheckRole;
