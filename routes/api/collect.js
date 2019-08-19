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
    let bookRatings = BookRating.find({ userId: req.user.id });
    let movieRatings = MovieRating.find({ userId: req.user.id });
    bookRatings = await bookRatings;
    movieRatings = await movieRatings;
    
    let ratedBooks = [];
    if (bookRatings) {
      ratedBooks = bookRatings.map(item => item.book);
    }
    let ratedMovies = [];
    if (movieRatings) {
      ratedMovies = movieRatings.map(item => item.movie);
    }

    let books = Book.find({ _id: { $nin: ratedBooks } }).limit(5);
    let movies = Movie.find({ _id: { $nin: ratedMovies } }).limit(5);
    books = await books;
    movies = await movies;
    
    res.json({books,movies})
  }
);
module.exports = router;
