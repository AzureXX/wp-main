module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user.role !== "admin") return next(new Error("Not authorised"));
    next();
  },
  isModerator: (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "moderator")
      return next(new Error("Not authorised"));
    next();
  }
};
