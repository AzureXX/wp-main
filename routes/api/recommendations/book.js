const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../../utils/roles');
const Book = require('../../../models/Book');
const BookRating = require('../../../models/Ratings/BookRating');
const BookRecommendation = require('../../../models/Recommendations/BookRecommendation');

//@route   GET api/recommendations/book
//@desc    Gets books recommendations from database
//@access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const recs = await BookRecommendation.findOne({userId: req.user.id}).populate("books.data")
      res.json(recs)
    } catch (error) {
      next(error)
    }
    
  }
);

//@route   POST api/recommendations/book
//@desc    Calculate recommendations for books
//@access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const ratings = await BookRating.findOne({ userId: req.user._id });

      const rated = ratings.books.map(item => item.id);

      const books = await Book.find({ _id: { $nin: rated } });
      const pointedBooks = books.map(item => ({
        data: item._id,
        points: Math.floor(Math.random() * 10000)
      }));
      pointedBooks.sort((a, b) => b.points - a.points);
      const toSave = { userId: req.user._id, books: pointedBooks };
      const recs = await BookRecommendation.update({userId: req.userId}, toSave, {upsert: true})
      res.json(recs);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
