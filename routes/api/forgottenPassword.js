const express = require('express');
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
// validator
const validateChangePassword = require('../../validation/validators/changePassword');
// service
const forgotPassword = require('../../services/forgotPassword');
// models
const User = require('../../models/User');
const Auth = require('../../models/Auth');
const ForgottenPasswordCode = require('../../models/ForgottenPasswordCode');

const router = express.Router();

//@route   POST api/password/forgot
//@desc    helping users to get their forgotten passwords
//@access  Public
router.post('/forgot', async (req, res, next) => {
  try {
    console.log(req.body)
    if (
      !joi
        .string()
        .email()
        .validate(req.body.email)
    ) {
      next(new Error('email.invalidFormat'));
    }
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

router.post('/change', async (req, res, next) => {
  try {
    validateChangePassword(req.body);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password1, salt);

    const passwordDoc = await ForgottenPasswordCode.findOneAndDelete({ code: req.body.code }).lean();

    await Auth.findOneAndUpdate({ userId: passwordDoc.userId }, { password: hash });
    res.json({ message: 'success' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
