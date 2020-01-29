const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require('../../../utils/requests');
const axios = require('axios');

//@route   GET api/recommendations/person
//@desc    Gets people recommendations from database
//@access  Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const response = await axios.get(process.env.RECOMMENDATION_LINK + `get/person/${req.user._id}`, {
      headers: {
        Authorization: process.env.RECOMMENDATION_ACCESS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    next(error.response.data);
  }
});

//@route   POST api/recommendations/person
//@desc    Calculate recommendations for people
//@access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const response = await axios.post(
      process.env.RECOMMENDATION_LINK + `update/person/${req.user._id}`,
      {},
      {
        headers: {
          Authorization: process.env.RECOMMENDATION_ACCESS_TOKEN
        }
      }
    );
    requests.checkAchievement(req, res, next, 'recommendation');
    res.json(response);
  } catch (error) {
    next(error.response.data);
  }
});

module.exports = router;
