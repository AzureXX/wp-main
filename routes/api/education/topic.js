const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../../utils/roles');
const EducationTopic = require("../../../models/Education/EducationTopic")
const EducationTopicRating = require('../../../models/Ratings/Education/EducationTopicRating')
const requests = require('../../../utils/requests');


//@route   POST api/education/topic/add
//@desc    Adds new education topic to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, EducationTopic, 'educationTopic');
  }
);

//@route   PUT api/education/topic/edit/:id
//@desc    Edit education topic in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, EducationTopic, 'educationTopic');
  }
);

//@route   DELETE api/education/topic/delete/:id
//@desc     Delete education topic from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, EducationTopic);
  }
);

//@route   GET api/education/topic/get/all/:page
//@desc    Get all education topics by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(req, res, next, EducationTopic, 'topics', EducationTopicRating, 1000);
});

//@route   GET api/education/topic/get/id/:id
//@desc    Get education topic by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, 'topic');
});

//@route   POST api/education/topic/rate
//@desc    Rates education topic
//@access  Private
router.post(
  '/rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.setRating(req, res, next, EducationTopicRating, 'topic');
  }
);
module.exports = router;