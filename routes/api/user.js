const express = require("express");
const router = express.Router();
const passport = require("passport");

//@route   GET api/user/current
//@desc    Return current user's email and id
//@access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      res.json({ handler: req.user.handler, id: req.user.id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
