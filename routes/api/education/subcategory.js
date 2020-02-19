const express = require('express');
const passport = require('passport');
// custom modules
const roles = require('../../../utils/roles');
const requests = require('../../../utils/requests');

const router = express.Router();
// @route   GET api/education/subcategory/get/all/:page?
// @desc    Get all education subcategories by page
// @access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'subcategories', 1000);
});

// @route   GET api/education/subcategory/get/id/:id
// @desc    Get education subcategory by id
// @access  Public
router.get('/get/id/:id', async (req, res, next) => {
  await requests.getItem(req, res, next, 'subcategories');
});

// @route   GET api/education/subcategory/get/parent/:id
// @desc    Get education categories of subcategory by id
// @access  Public
router.get('/get/parent/:id', async (req, res, next) => {
  await requests.getParent(req, res, next, 'subcategories');
});

// @route   POST api/education/subcategory/add
// @desc    Adds new education subcategory to database
// @access  Private/Moderator
router.post('/add', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.createItem(req, res, next, 'subcategory');
});

// @route   POST api/education/subcategory/setstatus
// @desc    Sets status for education subcategory
// @access  Private
router.post('/setstatus', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  await requests.setEducationStatus(req, res, next, 'subcategory');
});

// @route   PUT api/education/subcategory/edit/:id
// @desc    Edit education subcategory in database
// @access  Private/Moderator
router.put('/edit/:id', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.editItem(req, res, next, 'subcategory');
});

// @route   DELETE api/education/subcategory/delete/:id
// @desc    Delete education subcategory from database
// @access  Private/Moderator
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.deleteItem(req, res, next, 'subcategory');
});

module.exports = router;
