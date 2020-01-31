const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require('../../../utils/requests');
const axios = require('axios');

//@route   GET api/recommendations/movie
//@desc    Gets movies recommendations from database
//@access  Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const response = await axios.get(process.env.RECOMMENDATION_LINK + `get/movie/${req.user._id}`, {
      headers: {
        Authorization: process.env.RECOMMENDATION_ACCESS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    next(error.response ? error.response.data : error);
  }
});

//@route   POST api/recommendations/movie
//@desc    Calculate recommendations for movies
//@access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const response = await axios.post(
      process.env.RECOMMENDATION_LINK + `update/movie/${req.user._id}`,
      {},
      {
        headers: {
          Authorization: process.env.RECOMMENDATION_ACCESS_TOKEN
        }
      }
    );
    requests.checkAchievement(req, res, next, 'recommendation');
    res.json(response.data);
  } catch (error) {
    next(error.response ? error.response.data : error);
  }
});

module.exports = router;
