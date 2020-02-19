const express = require('express');
const passport = require('passport');
// custom modules
const roles = require('../../../utils/roles');
const requests = require('../../../utils/requests');

const router = express.Router();
// @route   GET api/education/topic/get/all/:page?
// @desc    Get all education topics by page
// @access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'topics', 1000);
});

// @route   GET api/education/topic/get/id/:id
// @desc    Get education topic by id
// @access  Public
router.get('/get/id/:id', async (req, res, next) => {
  await requests.getItem(req, res, next, 'topic');
});

// @route   GET api/education/topic/get/parent/:id
// @desc    Get education subcategories of topics by id
// @access  Public
router.get('/get/parent/:id', async (req, res, next) => {
  await requests.getParent(req, res, next, 'topics');
});

// @route   POST api/education/topic/add
// @desc    Adds new education topic to database
// @access  Private/Moderator
router.post('/add', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.createItem(req, res, next, 'topic');
});

// @route   POST api/education/topic/setstatus
// @desc    Sets status for education topic
// @access  Private
router.post('/setstatus', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  await requests.setEducationStatus(req, res, next, 'topic');
});

// @route   PUT api/education/topic/edit/:id
// @desc    Edit education topic in database
// @access  Private/Moderator
router.put('/edit/:id', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.editItem(req, res, next, 'topic');
});

// @route   DELETE api/education/topic/delete/:id
// @desc    Delete education topic from database
// @access  Private/Moderator
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.deleteItem(req, res, next, 'topic');
});

module.exports = router;
