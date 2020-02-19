const express = require('express');
const passport = require('passport');
const axios = require('axios');

const router = express.Router();
// @route   GET api/achievements/get/all
// @desc    Get all achievements from database
// @access  Public
router.get('/get/all', async (req, res, next) => {
  try {
    const response = await axios.get(process.env.ACHIEVEMENTS_LINK + 'get/all');
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// @route   GET api/achievements/get/id/:id
// @desc    Get achievement by id from database
// @access  Public
router.get('/get/id/:id', async (req, res, next) => {
  try {
    const response = await axios.get(process.env.ACHIEVEMENTS_LINK + 'get/id/' + req.params.id);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// @route   GET api/achievements/user/current
// @desc    Get current user achievement from database
// @access  Private
router.get(
  '/user/current',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res, next) => {
    try {
      const response = await axios.get(process.env.ACHIEVEMENTS_LINK + 'user/get/id/' + req.user._id);
      res.json(response.data);
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET api/achievements/user/id/:id
// @desc    Get any user achievement from database
// @access  Public
router.get('/user/id/:id', async (req, res, next) => {
  try {
    const response = await axios.get(process.env.ACHIEVEMENTS_LINK + 'user/get/id/' + req.params.id);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
