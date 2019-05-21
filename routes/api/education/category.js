const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../../utils/roles');

const EducationCategory = require("../../../models/Education/EducationCategory")
const EducationCategoryRating = require('../../../models/Ratings/Education/EducationCategoryRating')
const requests = require('../../../utils/requests');

//@route   POST api/education/category/add
//@desc    Adds new education category to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, EducationCategory, 'educationCategory');
  }
);

//@route   PUT api/education/category/edit/:id
//@desc    Edit education category in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, EducationCategory, 'educationCategory');
  }
);

//@route   DELETE api/education/category/delete/:id
//@desc     Delete education category from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, EducationCategory);
  }
);

//@route   GET api/education/category/get/all/:page
//@desc    Get all education categories by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(req, res, next, EducationCategory, 'categories', EducationCategoryRating, 1000);
});

//@route   GET api/education/category/get/id/:id
//@desc    Get education category by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, EducationCategory, 'categories', EducationCategoryRating);
});

//@route   POST api/education/category/rate
//@desc    Rates education category
//@access  Private
router.post(
  '/rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.setRating(req, res, next, EducationCategoryRating, 'categories');
  }
);

module.exports = router;