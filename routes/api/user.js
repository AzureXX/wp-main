const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const requests = require('../../utils/requests.js');

//@route   GET api/user/current
//@desc    Return current user's email and id
//@access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      res.json({
        email: req.user.email,
        username: req.user.username,
        id: req.user.id,
        role: req.user.role,
        type: req.user.accountType,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        description: req.user.description,
        country: req.user.country,
        city: req.user.city,
        dob: req.user.dob,
        phoneNumber: req.user.phoneNumber,
        emotion: req.user.emotion,
        generalAccessOptions: req.user.generalAccessOptions
      });
    } catch (error) {
      return next(error);
    }
  }
);

//@route   GET api/user/get/:username
//@desc    Return user by username or id
//@access  Public
router.get('/get/:username', async (req, res, next) => {
  try {
    const objId = new ObjectId(
      ObjectId.isValid(req.params.username)
        ? req.params.username
        : '123456789012'
    );
    const user = await User.findOne({
      $or: [{ username: req.params.username }, { _id: objId }]
    });

    if (!user) throw new Error('No user found');
    res.json({
      email: user.email,
      username: user.username,
      id: user.id,
      role: user.role,
      type: user.accountType,
      firstname: user.firstname,
      lastname: user.lastname,
      description: user.description,
      country: user.country,
      city: user.city,
      dob: user.dob,
      phoneNumber: user.phoneNumber
    });
  } catch (error) {
    return next(error);
  }
});

//@route   PUT api/user/update
//@desc    Return user by username or id
//@access  Private
router.put(
  '/update',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      let user;
      if (req.body.username && req.user.username !== req.body.username) {
        user = await User.findOne({ username: req.body.username });
        if (user) throw new Error('Username already exist');
      }
      if (req.body.email && req.user.email !== req.body.email) {
        user = await User.findOne({ email: req.body.email });
        if (user) throw new Error('Email already exist');
      }

      user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          username: req.body.username || req.user.username,
          email: req.body.email || req.user.email,
          firstname: req.body.firstname
            ? req.body.firstname
            : req.body.firstname === ''
            ? req.body.firstname
            : req.user.firstname,
          lastname: req.body.lastname
            ? req.body.lastname
            : req.body.lastname === ''
            ? req.body.lastname
            : req.user.lastname,
          city: req.body.city
            ? req.body.city
            : req.body.city === ''
            ? req.body.city
            : req.user.city,
          country: req.body.country
            ? req.body.country
            : req.body.country === ''
            ? req.body.country
            : req.user.country,
          description: req.body.description
            ? req.body.description
            : req.body.description === ''
            ? req.body.description
            : req.user.description,
          dob: req.body.dob
            ? req.body.dob
            : req.body.dob === ''
            ? null
            : req.user.dob,
          phoneNumber: req.body.phoneNumber
            ? req.body.phoneNumber
            : req.body.phoneNumber === ''
            ? req.body.phoneNumber
            : req.user.phoneNumber
        }
      );
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
);

//@route   PUT api/user/changepass
//@desc    Changes user password
//@access  Private
router.put(
  '/changepass',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { password, newPassword, newPassword2 } = req.body;
      const isMatch = await bcrypt.compare(password, req.user.password);
      if (isMatch) {
        if (newPassword !== newPassword2)
          throw new Error('Passwords do not match');
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate(req.user.id, { password: hash });
        res.json('Password was succesfully changed');
      } else {
        throw new Error('Old password is incorrect');
      }
    } catch (error) {
      next(error);
    }
  }
);

//@route   DELETE api/user/delete
//@desc    Deletes User
//@access  Private
router.delete(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { password } = req.body;
      const isMatch = await bcrypt.compare(password, req.user.password);
      if (isMatch) {
        await User.findOneAndDelete({ _id: req.user.id });
        return res.status(200).send('Successully deleted');
      } else {
        throw new Error('Password is incorrect');
      }
    } catch (error) {
      return next(error);
    }
  }
);

//@route   GET api/user/getrating/:type/:id
//@desc    Return user by username or id
//@access  Public
router.get('/getrating/:type/:id', async (req, res, next) => {
  if (req.params.type === 'all') {
    await requests.getUserRatingListAll(req, res, next);
  } else {
    await requests.getUserRatingList(req, res, next, req.params.type);
  }
});

//@route   GET api/user/getrating/:type/:id
//@desc    Return user by username or id
//@access  Public
router.get('/getedustatus/:type/:id', async (req, res, next) => {
  if (req.params.type === 'all') {
    await requests.getUserEducationStatusAll(req, res, next);
  } else {
    await requests.getUserEducationStatus(req, res, next, req.params.type);
  }
});

//@route   PUT api/user/generalaccess
//@desc    Return user by username or id
//@access  Private
router.put(
  '/generalaccess',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          generalAccessOptions: {
            showEmail: !!req.body.showEmail,
            showPhone: !!req.body.showPhone,
            showName: !!req.body.showName,
            showDOB: !!req.body.showDOB,
            showBookStatus: !!req.body.showBookStatus,
            showBookRating: !!req.body.showBookRating,
            showMovieStatus: !!req.body.showMovieStatus,
            showMovieRating: !!req.body.showMovieRating,
            showCourseStatus: !!req.body.showCourseStatus,
            showCourseRating: !!req.body.showCourseRating,
            showEducationStatus: !!req.body.showEducationStatus,
            giveTasks: !!req.body.giveTasks
          }
        },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

//@route   POST api/user/emote
//@desc    Changes emotion for user
//@access  Private
router.put(
  '/emote',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
      try {
          await User.update({_id: req.user.id}, {emotion: req.body.emotion || "neutral"})
          res.json("success")
      } catch (error) {
          next(error)
      }
  }
);

module.exports = router;
