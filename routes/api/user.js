const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

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
      return next(error);
    }
  }
);

router.get("/get/:handler", async (req, res, next) => {
  try {
    const objId = new ObjectId(
      ObjectId.isValid(req.params.handler) ? req.params.handler : "123456789012"
    );
    const user = await User.findOne({
      $or: [{ handler: req.params.handler }, { _id: objId }]
    });
    if (!user) return next(new Error("No user found"));
    res.json({
      handler: user.handler,
      id: user.id
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
