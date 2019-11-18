const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Joi = require('joi');
//@route   POST api/auth/signup
//@desc    Return JWT
//@access  Public
router.post('/signup', async (req, res, next) => {
  const { username, email, password, password2, type } = req.body;

  try {

    if (!password) throw new Error('password.required');
    if (password.length < 5) throw new Error('password.min');
    if (!email) throw new Error('email.required');
    if (password !== password2) throw new Error('password.notmatch');

    let exist = await User.findOne({ email: req.body.email }, "_id").lean();

    if (exist) throw new Error('email.exist');
    if (username) {
      exist = await User.findOne({ username: username }, "_id").lean();
      if (exist) throw new Error('user.exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({
      username: username,
      email: email,
      password: hash,
      accountType: type
    });
    const newUser = await user.save();
    const payload = {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role
    };
    const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
      expiresIn: 360000
    });
    return res.json({ success: true, token: 'Bearer ' + token });
  } catch (error) {
    return next(error);
  }
});

//@route   POST api/auth/signin
//@desc    Return JWT
//@access  Public
router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
    });

    let result = schema.validate(req.body,{abortEarly:false})

    if(result.error){
      throw new Error(result.error.details.map(e=> {
        switch (e.path[0]) {
          case "email": {
            switch (e.type) {
              case 'string.empty':
                return 'email.required';
              case 'string.email':
                return 'email.notemail';
            }
          }
          case "password": {
            switch (e.type ) {
              case 'string.empty':
                return 'password.required'
            }
          }
        }
        }))
    }

    const user = await User.findOne({ email }, "+password username role").lean();

    if (!user) throw new Error('user.notfound');
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user._id,
        username: user.username,
        role: user.role
      };
      const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: 360000
      });
      return res.json({ success: true, token: 'Bearer ' + token });
    } else {
      throw new Error('password.invalid');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
