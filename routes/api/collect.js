const express = require('express');
const router = express.Router();
const passport = require('passport');
const Book = require('../../models/Book');
const BookRating = require('../../models/Ratings/BookRating');
const Movie = require('../../models/Movie');
const MovieRating = require('../../models/Ratings/MovieRating');
const Question = require("../../models/Question");
const QuestionAnswer = require("../../models/QuestionAnswer");
router.get(
  '/initial',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    let bookRatings = BookRating.find({ userId: req.user._id }).lean();
    let movieRatings = MovieRating.find({ userId: req.user._id }).lean();
    let questionAnswers = QuestionAnswer.find({ userId: req.user._id }).lean();
    bookRatings = await bookRatings;
    movieRatings = await movieRatings;
    questionAnswers = await questionAnswers;

    let ratedBooks = [];
    if (bookRatings) {
      ratedBooks = bookRatings.map(item => item.book);
    }
    let ratedMovies = [];
    if (movieRatings) {
      ratedMovies = movieRatings.map(item => item.movie);
    }
    let answeredQuestion = [];
    if (questionAnswers) {
      answeredQuestion = questionAnswers.map(item => item.question);
    }

    let books = Book.find({ _id: { $nin: ratedBooks } }).limit(5).lean();
    let movies = Movie.find({ _id: { $nin: ratedMovies } }).limit(5).lean();
    let questions = Question.find({ _id: { $nin: answeredQuestion } }).limit(5).lean();
    books = await books;
    movies = await movies;
    questions = await questions
    return res.json({books,movies, questions})
  }
);
module.exports = router;
