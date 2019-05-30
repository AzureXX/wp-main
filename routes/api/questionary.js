const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Questionary = require('../../models/Questionary');

const requests = require('../../utils/requests');
//@route   POST api/questionary/add
//@desc    Adds new questionary to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, Questionary, 'questionary');
  }
);

//@route   PUT api/questionary/edit/:id
//@desc    Edit questionary in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, Questionary, 'questionary');
  }
);

//@route   DELETE api/questionary/delete/:id
//@desc     Delete questionary from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, Questionary);
  }
);

//@route   GET api/questionary/get/all/:page
//@desc    Get all questionaries by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(req, res, next, Questionary, 'questionaries', null, 20);
});

//@route   GET api/questionary/get/id/:id
//@desc    Get questionary by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, Questionary, 'questionaries', null);
});

module.exports = router;
