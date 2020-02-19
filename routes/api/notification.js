const express = require('express');
const passport = require('passport');
// models
const Notification = require('../../models/Notification');

const router = express.Router();
// @route   GET api/notification/get/current
// @desc    Get notification for current user
// @access  Private
router.get(
  '/get/current',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res, next) => {
    try {
      const notifications = await Notification.find({
        $or: [
          {
            all: true
          },
          {
            to: req.user._id
          }
        ]
      }).lean();
      return res.json(notifications);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
