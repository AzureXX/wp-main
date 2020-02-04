const express = require('express');
const forgotPasswordMailSender = require('../../services/forgotPasswordMailSender');
// model
const User = require('../../models/User');
const Auth = require('../../models/Auth');

const router = express.Router();

//@route   POST api/forgotPassword
//@desc    helping users to get their forgotten passwords
//@access  Private
router.post('/', async (req, res, next) => {
  let user = await User.findOne({ verified: { email: req.body.email } }, 'verified').lean();
  if (!user) next(new Error('user.notFound'));

  forgotPasswordMailSender();
});

module.exports = router;
