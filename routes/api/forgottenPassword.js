const express = require('express');
const bcrypt = require('bcryptjs');
// custom modules
const validateForgotPassword = require('../../validation/validators/forgotPassword');
const validateChangePassword = require('../../validation/validators/changePassword');
const forgotPassword = require('../../services/forgotPassword');
// models
const User = require('../../models/User');
const Auth = require('../../models/Auth');
const ForgottenPasswordCode = require('../../models/ForgottenPasswordCode');

const router = express.Router();
// @route   POST api/password/forgot
// @desc    helping users to get their forgotten passwords by sending mail
// @access  Public
router.post('/forgot', async (req, res, next) => {
  try {
    validateForgotPassword(req.body);

    let user = await User.findOne({ verified: { email: req.body.email } }, 'verified').lean();
    if (!user) {
      throw new Error('user.notFound');
    }
    forgotPassword(user._id, user.verified.email);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// @route   POST api/password/change
// @desc    allowing users to change their password
// @access  Public
router.post('/change', async (req, res, next) => {
  try {
    validateChangePassword(req.body);

    const passwordDoc = await ForgottenPasswordCode.findOneAndDelete({ code: req.body.code }).lean();
    if (!passwordDoc) throw new Error('code.invalid');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password1, salt);

    await Auth.findOneAndUpdate({ userId: passwordDoc.userId }, { password: hash });
    res.json({ message: 'success' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
