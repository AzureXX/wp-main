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
    if (!password) throw new Error('Password is required');
    if (!email) throw new Error('Email is required');
    if (password != password2) throw new Error('Passwords do not match');

    let exist = await User.findOne({ email: req.body.email }, "_id").lean();

    if (exist) throw new Error('Email already exists');
    if (username) {
      exist = await User.findOne({ username: username }, "_id").lean();
      if (exist) throw new Error('Username already exists');
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
    console.log(payload)
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
        .required()
        .error(errors => {
          return errors.map(err => {
            switch (err.type) {
              case 'any.required':
                return { message: 'Email is required' };
              case 'string.email':
                return { message: 'Not a valid email' };
            }
          });
        }),
      password: Joi.string()
        .required()
        .error(errors => {
          return errors.map(err => {
            switch (err.type) {
              case 'any.required':
                return {
                  message: {
                    en: 'Password is required',
                    ru: 'Необходимо ввести пароль',
                    az: 'Parol mütləqdi'
                  }
                };
            }
          });
        })
    });

    Joi.validate(req.body, schema, { abortEarly: false }, (err, value) => {
      const errors = {};
      
      if (err) {
        err.details.forEach(el => {
          errors[el.path[0]] = el.message;
        });
        throw new Error(JSON.stringify(errors));
      } 
    });

    const user = await User.findOne({ email }, "+password username role").lean();
    if (!user) throw new Error('User Not Found');
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
      throw new Error('Password is incorrect');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
