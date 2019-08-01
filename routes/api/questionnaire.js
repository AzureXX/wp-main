const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');
//@route   POST api/questionnaire/add
//@desc    Adds new questionnaire to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, 'questionnaire');
  }
);

//@route   PUT api/questionnaire/edit/:id
//@desc    Edit questionnaire in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, 'questionnaire');
  }
);

//@route   DELETE api/questionnaire/delete/:id
//@desc     Delete questionnaire from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, "questionnaire");
  }
);

//@route   GET api/questionnaire/get/all/:page
//@desc    Get all questionnaire by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'questionnaires', 20);
});

//@route   GET api/questionnaire/get/id/:id
//@desc    Get questionnaire by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, 'questionnaires');
});

module.exports = router;
