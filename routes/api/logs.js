const express = require('express');
const axios = require('axios');
const passport = require('passport');

const router = express.Router();
// @route   GET api/logs/
// @desc    gets all user logs
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const response = await axios.get(process.env.LOGS_LINK + `logs/${req.user._id}`, {
      headers: {
        Authorization: process.env.LOGS_ACCESS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    next(error.response ? error.response.data : error);
  }
});

// @route   DELETE api/logs/
// @desc    clears user logs
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const response = await axios.delete(process.env.LOGS_LINK + `logs/${req.user._id}`, {
      headers: {
        Authorization: process.env.LOGS_ACCESS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    next(error.response ? error.response.data : error);
  }
});

module.exports = router;
