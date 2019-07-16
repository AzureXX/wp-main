const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Person = require('../../models/Person');
const PersonRating = require('../../models/Ratings/PersonRating');

const requests = require('../../utils/requests');

//@route   POST api/person/add
//@desc    Adds new person to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, Person, 'person');
  }
);

//@route   PUT api/person/edit/:id
//@desc    Edit person in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, Person, 'person');
  }
);

//@route   DELETE api/person/delete/:id
//@desc     Delete person from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, Person);
  }
);

//@route   GET api/person/get/all/:page
//@desc    Get all people by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(
    req,
    res,
    next,
    Person,
    'people',
    PersonRating,
    20
  );
});

//@route   GET api/person/get/id/:id
//@desc    Get person by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, Person, 'people');
});

//@route   POST api/course/rate
//@desc    Rates course
//@access  Private
router.post(
  '/rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.setRating(req, res, next, PersonRating, 'people');
  }
);
module.exports = router;
