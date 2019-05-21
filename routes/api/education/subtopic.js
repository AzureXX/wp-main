const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../../utils/roles');

const EducationSubtopic = require("../../../models/Education/EducationSubtopic")
const EducationSubtopicRating = require('../../../models/Ratings/Education/EducationSubtopicRating')
const requests = require('../../../utils/requests');

//@route   POST api/education/subtopic/add
//@desc    Adds new education subtopic to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, EducationSubtopic, 'educationSubtopic');
  }
);

//@route   PUT api/education/subtopic/edit/:id
//@desc    Edit education subtopic in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, EducationSubtopic, 'educationSubtopic');
  }
);

//@route   DELETE api/education/subtopic/delete/:id
//@desc     Delete education subtopic from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, EducationSubtopic);
  }
);

//@route   GET api/education/subtopic/get/all/:page
//@desc    Get all education subtopics by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(req, res, next, EducationSubtopic, 'subtopics', EducationSubtopicRating, 1000);
});

//@route   GET api/education/subtopic/get/id/:id
//@desc    Get education subtopic by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, EducationSubtopic, 'subtopic', EducationSubtopicRating);
});

//@route   POST api/education/subtopic/rate
//@desc    Rates education subtopic
//@access  Private
router.post(
  '/rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.setRating(req, res, next, EducationSubtopicRating, 'subtopic');
  }
);
module.exports = router;