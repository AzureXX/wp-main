const express = require('express');
const router = express.Router();
const Book = require('../../models/Book');
const BookRating = require('../../models/Ratings/BookRating');
const Movie = require('../../models/Movie');
const MovieRating = require('../../models/Ratings/MovieRating');
const Course = require('../../models/Course');
const CourseRating = require('../../models/Ratings/CourseRating');
const Music = require('../../models/Music');
const MusicRating = require('../../models/Ratings/MusicRating');
const Question = require('../../models/Question');
const QuestionAnswer = require('../../models/QuestionAnswer');
const roles = require('../../utils/roles');

router.get('/initial', roles.isUser, async (req, res, next) => {
  let ratedBooks = [];
  let ratedMovies = [];
  let ratedMusic = [];
  let ratedCourses = [];
  let answeredQuestion = [];
  if (req.user._id) {
    let bookRatings = BookRating.find({ userId: req.user._id }).lean();
    let movieRatings = MovieRating.find({ userId: req.user._id }).lean();
    let musicRatings = MusicRating.find({ userId: req.user._id }).lean();
    let courseRatings = CourseRating.find({ userId: req.user._id }).lean();
    let questionAnswers = QuestionAnswer.find({ userId: req.user._id }).lean();

    bookRatings = await bookRatings;
    movieRatings = await movieRatings;
    courseRatings = await courseRatings;
    musicRatings = await musicRatings;
    questionAnswers = await questionAnswers;

    if (bookRatings) {
      ratedBooks = bookRatings.map(item => item.book);
    }

    if (movieRatings) {
      ratedMovies = movieRatings.map(item => item.movie);
    }

    if (musicRatings) {
      ratedMusic = musicRatings.map(item => item.music);
    }

    if (movieRatings) {
      ratedCourses = movieRatings.map(item => item.movie);
    }

    if (questionAnswers) {
      answeredQuestion = questionAnswers.map(item => item.question);
    }
  }

  let books = Book.find({ _id: { $nin: ratedBooks } })
    .limit(20)
    .lean();
  let movies = Movie.find({ _id: { $nin: ratedMovies } })
    .limit(20)
    .lean();
  let music = Music.find({ _id: { $nin: ratedMusic } })
    .limit(20)
    .lean();
  let courses = Course.find({ _id: { $nin: ratedCourses } })
    .limit(20)
    .lean();
  let questions = Question.find({ _id: { $nin: answeredQuestion } })
    .limit(20)
    .lean();
  books = await books;
  movies = await movies;
  music = await music;
  courses = await courses;
  questions = await questions;
  return res.json({ books, movies, music, courses,questions });
});
module.exports = router;
