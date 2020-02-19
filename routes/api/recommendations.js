const express = require('express');
const passport = require('passport');
const axios = require('axios');
// custom modules
const requests = require('../../utils/requests');

const router = express.Router();
// @route   GET api/recommendations/:type
// @desc    Gets certain types recommendations from database
// @access  Private
router.get('/:type', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const types = ['book', 'movie', 'course', 'person', 'music', 'vacancy', 'education'];
    const { type } = req.params;
    if (!types.includes(type)) throw new Error('type.invalid');

    const response = await axios.get(process.env.RECOMMENDATION_LINK + `get/${req.params.type}/${req.user._id}`, {
      headers: {
        Authorization: process.env.RECOMMENDATION_ACCESS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    next(error.response ? error.response.data : error);
  }
});

// @route   POST api/recommendations/:type
// @desc    Calculate recommendations for certain type
// @access  Private
router.post('/:type', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const types = ['book', 'movie', 'course', 'person', 'music', 'vacancy', 'education'];
    const { type } = req.params;
    if (!types.includes(type)) throw new Error('type.invalid');

    const response = await axios.post(
      process.env.RECOMMENDATION_LINK + `update/${req.params.type}/${req.user._id}`,
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
