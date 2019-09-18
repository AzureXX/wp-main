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
    res.json("Hello")
  }
);

//@route   POST api/recommendations/vacancy
//@desc    Calculate recommendations for vacancies
//@access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    res.json("Hello")
  }
);

module.exports = router;
