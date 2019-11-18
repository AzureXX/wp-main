const passport = require('passport');

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user.role !== "admin") 
      return next(new Error("Not authorised"));
    next();
  },
  isModerator: (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "moderator")
      return next(new Error("Not authorised"));
    next();
  },
  isUser: (req,res,next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      req.user = user;
      next();
    })(req, res, next);
  },
  isBusiness: (req, res, next) => {
    if (req.user.accountType !== "business")
      return next(new Error("Not authorised"));
    next();
  },
};
