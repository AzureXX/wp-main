const express = require('express');
const passport = require('passport');
// custom modules
const roles = require('../../../utils/roles');
const requests = require('../../../utils/requests');

const router = express.Router();
// @route   GET api/education/category/get/all/:page?
// @desc    Get all education categories by page
// @access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'categories', 1000);
});

// @route   GET api/education/category/get/id/:id
// @desc    Get education category by id
// @access  Public
router.get('/get/id/:id', async (req, res, next) => {
  await requests.getItem(req, res, next, 'categories');
});

// @route   POST api/education/category/add
// @desc    Adds new education category to database
// @access  Private/Moderator
router.post('/add', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.createItem(req, res, next, 'category');
});

// @route   PUT api/education/category/edit/:id
// @desc    Edit education category in database
// @access  Private/Moderator
router.put('/edit/:id', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.editItem(req, res, next, 'category');
});

// @route   DELETE api/education/category/delete/:id
// @desc    Delete education category from database
// @access  Private/Moderator
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.deleteItem(req, res, next, 'category');
});

module.exports = router;
