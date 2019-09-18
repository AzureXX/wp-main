const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require("../../../utils/requests")

//@route   GET api/recommendations/education
//@desc    Gets education recommendations from database
//@access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    res.json("Hello")
  }
);

//@route   POST api/recommendations/education
//@desc    Calculate recommendations for education
//@access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    res.json("Hello")
  }
);

module.exports = router;
