const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');

//@route   POST api/music/add
//@desc    Adds new music to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, 'music');
  }
);

//@route   PUT api/music/edit/:id
//@desc    Edit music in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, 'music');
  }
);

//@route   DELETE api/music/delete/:id
//@desc     Delete music from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, "music");
  }
);

//@route   GET api/music/get/all/:page
//@desc    Get all music by page
//@access  Public
router.get('/get/all/:page?',  async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'music', 20);
});

//@route   GET api/music/get/id/:id
//@desc    Get music by id
//@access  Public
router.get('/get/id/:id',  async (req, res, next) => {
  await requests.getItem(req, res, next, 'music');
});


module.exports = router;
