const express = require('express');
const passport = require('passport');
// custom modules
const EmailVerification = require('../../models/EmailVerification');
const verifyEmail = require('../../services/verifyEmail');
// models
const User = require('../../models/User');

const router = express.Router();
// @route   POST api/verify
// @desc    Sends email verification mail to user
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    let activationCode = await EmailVerification.findOne({ code: req.body.code });
    if (!activationCode) {
      throw new Error('emailVerification.notFound');
    }
    // check if 3 days have passed since link was sent
    if (Date.now() - new Date(`${activationCode.date}`).getTime() > 259200000) {
      EmailVerification.deleteOne({ code: req.body.code }).exec();
      throw new Error('emailVerification.expired');
    } else {
      await User.updateOne({ _id: activationCode.userId }, { $set: { 'verified.email': activationCode.email } });
      EmailVerification.deleteOne({ code: req.body.code }).exec();
      res.json('success');
    }
  } catch (error) {
    next(error);
  }
});

// @route   POST api/verify/resend
// @desc    Resends verification mail to user's email
// @access  Private
router.post('/resend', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const activationCode = await EmailVerification.findOne({ userId: req.user._id }, 'date').lean();
    if (Date.now() - new Date(`${activationCode.date}`).getTime() < 900000) throw new Error('email.alreadysent');
    verifyEmail(req.user._id, req.user.email);
    res.json('success');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
