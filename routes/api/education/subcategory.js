const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../../utils/roles');

const EducationSubcategory = require("../../../models/Education/EducationSubcategory")
const EducationSubcategoryRating = require('../../../models/Ratings/Education/EducationSubcategoryRating')
const requests = require('../../../utils/requests');

//@route   POST api/education/subcategory/add
//@desc    Adds new education subcategory to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, EducationSubcategory, 'educationSubcategory');
  }
);

//@route   PUT api/education/subcategory/edit/:id
//@desc    Edit education subcategory in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, EducationSubcategory, 'educationSubcategory');
  }
);

//@route   DELETE api/education/subcategory/delete/:id
//@desc     Delete education subcategory from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, EducationSubcategory);
  }
);

//@route   GET api/education/subcategory/get/all/:page
//@desc    Get all education subcategories by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(req, res, next, EducationSubcategory, 'subcategories', EducationSubcategoryRating, 1000);
});

//@route   GET api/education/subcategory/get/id/:id
//@desc    Get education subcategory by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, 'subcategories');
});

//@route   POST api/education/subcategory/rate
//@desc    Rates education subcategory
//@access  Private
router.post(
  '/rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.setRating(req, res, next, EducationSubcategoryRating, 'subcategories');
  }
);
module.exports = router;