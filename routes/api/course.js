const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Course = require('../../models/Course');
const transformation = require('../../utils/transformation');
const validation = require('../../utils/validation');

//@route   POST api/course/add
//@desc    Adds new course to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      const { nameEn, descriptionEn, authors, genres } = req.body;
      const newCourse = new Course();
      newCourse.name.en = nameEn;
      newCourse.description.en = descriptionEn;
      newCourse.authors = authors
        ? authors.split(',').map(item => item.trim())
        : null;
      newCourse.genres = genres
        ? genres.split(',').map(item => item.trim())
        : null;
      const course = await newCourse.save();
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
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
    const { nameEn, descriptionEn, authors, genres } = req.body;
    try {
      const id = transformation.mongooseId(req.params.id);
      const course = await Course.findById(id);
      if (!course) throw new Error('No such course exist');
      course.name.en = nameEn;
      course.description.en = descriptionEn;
      course.authors = authors
        ? authors.split(',').map(item => item.trim())
        : null;
      course.genres = genres
        ? genres.split(',').map(item => item.trim())
        : null;
      await course.save();
      res.json('Success');
    } catch (error) {
      next(error);
    }
  }
);

//@route   Delete api/course/delete
//@desc     Delete course from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      if (!(validation.mongooseId(req.params.id)))
        throw new Error('ID is not valid');
      await Course.findByIdAndDelete(req.params.id);
      res.json('Success');
    } catch (error) {
      next(error);
    }
  }
);

//@route   GET api/course/get/all/:page
//@desc    Get all courses by page
//@access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  try {
    let page = parseInt(req.params.page);
    const size = 3;
    if (isNaN(page)) page = 1;
    const offset = (page - 1) * size;
    const courses = await Course.find()
      .skip(offset)
      .limit(size);
    if (courses.length == 0) throw new Error('No such page');
    if (courses.length < size) res.json({ lastPage: true, courses });
    res.json({ lastPage: false, courses });
  } catch (error) {
    next(error);
  }
});

//@route   GET api/course/get/id/:id
//@desc    Get course by id
//@access  Public
router.get('/get/id/:id', async (req, res, next) => {
  try {
    const id =  transformation.mongooseId(req.params.id);
    const course = await Course.findById(id);
    if (!course) throw new Error('No such course exist');
    res.json(course);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
