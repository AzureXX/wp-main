const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require("../../../utils/requests")

//@route   GET api/recommendations/vacancy
//@desc    Gets vacancy recommendations from database
//@access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.getItemRecommendations(req,res,next, "vacancy")
  }
);

//@route   POST api/recommendations/vacancy
//@desc    Calculate recommendations for vacancies
//@access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.updateVacancyRecommendations(req,res,next)
  }
);

module.exports = router;
