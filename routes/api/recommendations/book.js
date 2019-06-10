const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require("../../../utils/requests")

//@route   GET api/recommendations/book
//@desc    Gets books recommendations from database
//@access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.getItemRecommendations(req,res,next, "book")
  }
);

//@route   POST api/recommendations/book
//@desc    Calculate recommendations for books
//@access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.updateItemRecommendations(req,res,next, "book");
  }
);

module.exports = router;
