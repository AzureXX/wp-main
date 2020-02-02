const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailVerification = require('../../services/emailVerification');
const validator = require('../../validation/validators/auth');

const passport = require('passport');
const roles = require('../../utils/roles');

const User = require('../../models/User');
const Auth = require('../../models/Auth');


//@route   POST api/auth/signup
//@desc    Return JWT
//@access  Public
router.post(
  '/signup',
  // passport.authenticate('jwt', {
  //   session: false
  // }),
  // roles.isAdmin,
  async (req, res, next) => {
    try {
      validator.signUp(req.body);

      const { username, email, password, type } = req.body;

      let exist = await Auth.findOne({ email }, '_id').lean();

      if (exist) throw new Error('email.exist');
      if (username) {
        exist = await User.findOne({ username }, '_id').lean();
        if (exist) throw new Error('user.exist');
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = new User({
        username: username,
        accountType: type
      });
      const auth = new Auth({
        email: email,
        password: hash,
        userId: user._id
      });
      await auth.save();
      const newUser = await user.save();
      emailVerification(newUser._id, email);

      const payload = {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role
      };

      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: 360000
      });
      return res.json({
        success: true,
        token: 'Bearer ' + token
      });
    } catch (error) {
      next(error);
    }
  }
);

//@route   POST api/auth/signin
//@desc    Return JWT
//@access  Public
router.post('/signin', async (req, res, next) => {
  try {
    validator.signIn(req.body);
    
    const { email, password } = req.body;
    const auth = await Auth.findOne({ email }, "+password").lean();
    if (!auth) throw new Error('user.notfound');
    const user = await User.findById(auth.userId).lean();
    if (!user) throw new Error('user.notfound');
    const isMatch = await bcrypt.compare(password, auth.password);
    if (isMatch) {
      const payload = {
        id: user._id,
        username: user.username,
        role: user.role
      };
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: 360000
      });
      return res.json({
        success: true,
        token: 'Bearer ' + token
      });
    } else {
      throw new Error('password.invalid');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
