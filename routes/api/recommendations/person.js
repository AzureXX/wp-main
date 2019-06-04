const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require("../../../utils/requests")

//@route   GET api/recommendations/person
//@desc    Gets people recommendations from database
//@access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.getItemRecommendations(req,res,next, "person")
  }
);

//@route   POST api/recommendations/person
//@desc    Calculate recommendations for people
//@access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.updateItemReccomendations(req,res,next, "person");
  }
);

module.exports = router;
