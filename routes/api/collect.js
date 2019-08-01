const express = require('express');
const router = express.Router();
const passport = require('passport');
const Book = require('../../models/Book');
const BookRating = require('../../models/Ratings/BookRating');
const Movie = require('../../models/Movie');
const MovieRating = require('../../models/Ratings/MovieRating');

router.get(
  '/initial',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    let bookRatings = BookRating.findOne({ userId: req.user.id });
    let movieRatings = MovieRating.findOne({ userId: req.user.id });
    bookRatings = await bookRatings;
    movieRatings = await movieRatings;
    let ratedBooks = [];
    if (bookRatings) {
      ratedBooks = bookRatings['books'].map(item => item.id);
    }
    let ratedMovies = [];
    if (movieRatings) {
      ratedMovies = movieRatings['movies'].map(item => item.id);
    }

    let books = Book.find({ _id: { $nin: ratedBooks } }).limit(5);
    let movies = Movie.find({ _id: { $nin: ratedMovies } }).limit(5);
    books = await books;
    movies = await movies;
    
    res.json({books,movies})
  }
);
module.exports = router;
