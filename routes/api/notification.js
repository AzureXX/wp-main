const express = require('express');
const router = express.Router();
const passport = require('passport');
const Notification = require("../../models/Notification")

//@route   GET api/notification/get/current
//@desc    Get notification for current user
//@access  Public
router.get("/get/current", passport.authenticate('jwt', {
  session: false
}), async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      $or: [{
        all: true
      }, {
        to: req.user._id
      }]
    }).lean()
    return res.json(notifications)
  } catch (error) {
    next(error)
  }
})

module.exports = router;