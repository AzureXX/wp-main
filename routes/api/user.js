const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const requests = require('../../utils/requests.js');
const roles = require('../../utils/roles');
const Auth = require('../../models/Auth');

//@route   GET api/user/current
//@desc    Return current user's email and id
//@access  Private
router.get(
  '/current',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res, next) => {
    try {
      return res.json({
        email: req.user.email,
        username: req.user.username,
        id: req.user._id,
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
        generalAccessOptions: req.user.generalAccessOptions,
        verified: req.user.verified
      });
    } catch (error) {
      return next(error);
    }
  }
);

//@route   GET api/user/get/:username
//@desc    Return user by username or id
//@access  Public
router.get('/get/:username', roles.isUser, async (req, res, next) => {
  try {
    const objId = new ObjectId(ObjectId.isValid(req.params.username) ? req.params.username : '123456789012');

    const user = await User.findOne({
      $or: [
        {
          username: req.params.username
        },
        {
          _id: objId
        }
      ]
    }).lean();

    if (!user) throw new Error('user.notfound');
    const access = await requests.getUserAccess(req, res, next, user._id);
    return res.json({
      email: access.showEmail ? user.verified.email : 'No access',
      username: user.username,
      id: user._id,
      role: user.role,
      type: user.accountType,
      firstname: access.showName ? user.firstname : 'No ',
      lastname: access.showName ? user.lastname : 'access',
      description: user.description,
      country: user.country,
      city: user.city,
      dob: access.showDOB ? user.dob : 'No access',
      phoneNumber: access.showPhone ? user.phoneNumber : 'No access'
    });
  } catch (error) {
    return next(error);
  }
});

//@route   GET api/user/getall/:page?/:docLimit?
//@desc    Returns all users
//@access  Public
router.get('/getall/:page?/:docLimit?', async (req, res, next) => {
  try {
    const page = req.params.page && req.params.page >= 0 ? req.params.page : 0;
    const docLimit = req.params.docLimit && req.params.docLimit >= 1 ? req.params.docLimit : 100;
    const users = await User.find({}, 'username')
      .skip(page == 0 || page == 1 ? 0 : (page - 1) * docLimit)
      .limit(+docLimit)
      .lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//@route   PUT api/user/update
//@desc    Return user by username or id
//@access  Private
router.put(
  '/update',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res, next) => {
    try {
      let user;
      if (req.body.username && req.user.username !== req.body.username) {
        user = await User.findOne(
          {
            username: req.body.username
          },
          '_id'
        ).lean();
        if (user) throw new Error('user.exist');
      }
      if (req.body.email && req.user.email !== req.body.email) {
        user = await User.findOne(
          {
            email: req.body.email
          },
          '_id'
        ).lean();
        if (user) throw new Error('email.exist');
      }

      user = await User.findOneAndUpdate(
        {
          _id: req.user._id
        },
        {
          username: req.body.username || req.user.username,
          email: req.body.email || req.user.email,
          firstname: req.body.firstname ? req.body.firstname : req.body.firstname === '' ? req.body.firstname : req.user.firstname,
          lastname: req.body.lastname ? req.body.lastname : req.body.lastname === '' ? req.body.lastname : req.user.lastname,
          city: req.body.city ? req.body.city : req.body.city === '' ? req.body.city : req.user.city,
          country: req.body.country ? req.body.country : req.body.country === '' ? req.body.country : req.user.country,
          description: req.body.description ? req.body.description : req.body.description === '' ? req.body.description : req.user.description,
          dob: req.body.dob ? req.body.dob : req.body.dob === '' ? null : req.user.dob,
          phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : req.body.phoneNumber === '' ? req.body.phoneNumber : req.user.phoneNumber
        }
      );
      return res.status(200).json('success');
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
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res, next) => {
    try {
      const { password, newPassword, newPassword2 } = req.body;
      const isMatch = await bcrypt.compare(password, req.user.password);
      if (isMatch) {
        if (newPassword !== newPassword2) throw new Error('password.notmatch');
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        await Auth.findOneAndUpdate(
          { userId: req.user._id },
          {
            password: hash
          }
        );
        return res.json('Password was succesfully changed');
      } else {
        throw new Error('password.oldinvalid');
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
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res, next) => {
    try {
      const { password } = req.body;
      const isMatch = await bcrypt.compare(password, req.user.password);
      if (isMatch) {
        await User.findOneAndDelete({
          _id: req.user._id
        });
        await Auth.findOneAndDelete({
          userId: req.user._id
        });
        return res.status(200).send('Successully deleted');
      } else {
        throw new Error('password.invalid');
      }
    } catch (error) {
      return next(error);
    }
  }
);

//@route   GET api/user/getrating/:type/:id
//@desc    Return user by username or id
//@access  Public
router.get('/getrating/:type/:id', roles.isUser, async (req, res, next) => {
  if (req.params.type === 'all') {
    await requests.getUserRatingListAll(req, res, next);
  } else {
    await requests.getUserRatingList(req, res, next, req.params.type);
  }
});

//@route   GET api/user/getrating/:type/:id
//@desc    Return user by username or id
//@access  Public
router.get('/getedustatus/:type/:id', roles.isUser, async (req, res, next) => {
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
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res, next) => {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.user._id
        },
        {
          generalAccessOptions: {
            showEmail: !!req.body.showEmail,
            showPhone: !!req.body.showPhone,
            showName: !!req.body.showName,
            showDOB: !!req.body.showDOB,
            showBookInfo: !!req.body.showBookInfo,
            showMovieInfo: !!req.body.showMovieInfo,
            showMusicInfo: !!req.body.showMusicInfo,
            showCourseInfo: !!req.body.showCourseInfo,
            showEducationInfo: !!req.body.showEducationInfo,
            giveTasks: !!req.body.giveTasks
          }
        },
        {
          new: true
        }
      );
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

//@route   PUT api/user/emote
//@desc    Changes emotion for user
//@access  Private
router.put(
  '/emote',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res, next) => {
    try {
      await User.updateOne(
        {
          _id: req.user._id
        },
        {
          emotion: req.body.emotion || 'neutral'
        }
      );
      return res.json('success');
    } catch (error) {
      next(error);
    }
  }
);

//@route   GET api/user/tags
//@desc    Changes emotion for user
//@access  Private
router.get(
  '/tags',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res, next) => {
    await requests.calculateUserTags(req, res, next);
  }
);
module.exports = router;
