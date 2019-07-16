const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Course = require('../../models/Course');
const CourseRating = require('../../models/Ratings/CourseRating');

const requests = require('../../utils/requests');

//@route   POST api/course/add
//@desc    Adds new course to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, Course, 'course');
  }
);

//@route   PUT api/course/edit/:id
//@desc    Edit course in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, Course, 'course');
  }
);

//@route   DELETE api/course/delete/:id
//@desc     Delete course from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, Course);
  }
);

//@route   GET api/course/get/all/:page
//@desc    Get all courses by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(
    req,
    res,
    next,
    Course,
    'courses',
    CourseRating,
    20
  );
});

//@route   GET api/course/get/id/:id
//@desc    Get course by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, Course, 'courses');
});

//@route   POST api/course/rate
//@desc    Rates course
//@access  Private
router.post(
  '/rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.setRating(req, res, next, CourseRating, 'courses');
  }
);
module.exports = router;
