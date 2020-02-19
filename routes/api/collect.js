const express = require('express');
const axios = require('axios');
// custom modules
const roles = require('../../utils/roles');
// models
const Book = require('../../models/Book');
const Movie = require('../../models/Movie');
const Course = require('../../models/Course');
const Music = require('../../models/Music');
const Question = require('../../models/Question');
const QuestionAnswer = require('../../models/QuestionAnswer');
const BookRating = require('../../models/Ratings/BookRating');
const MovieRating = require('../../models/Ratings/MovieRating');
const CourseRating = require('../../models/Ratings/CourseRating');
const MusicRating = require('../../models/Ratings/MusicRating');

const router = express.Router();
// @route   GET api/collect/initial
// @desc    Get initial recommendations for user
// @access  Private/User
router.get('/initial', roles.isUser, async (req, res, next) => {
  try {
    let ratedBooks = [];
    let ratedMovies = [];
    let ratedMusic = [];
    let ratedCourses = [];
    let answeredQuestion = [];
    let bookRec, movieRec, musicRec, courseRec;

    if (req.user._id) {
      const response = await axios.get(process.env.RECOMMENDATION_LINK + `get/all/${req.user._id}`, {
        headers: {
          Authorization: process.env.RECOMMENDATION_ACCESS_TOKEN
        }
      });
      bookRec = response.data.books && response.data.books.books.map(item => item.data).slice(0, 20);
      movieRec = response.data.movies && response.data.movies.movies.map(item => item.data).slice(0, 20);
      musicRec = response.data.music && response.data.music.music.map(item => item.data).slice(0, 20);
      courseRec = response.data.courses && response.data.courses.courses.map(item => item.data).slice(0, 20);
      let bookRatings, movieRatings, musicRatings, courseRatings;
      if (!bookRec) {
        bookRatings = BookRating.find({ userId: req.user._id }).lean();
      }
      if (!movieRec) {
        movieRatings = MovieRating.find({ userId: req.user._id }).lean();
      }
      if (!musicRec) {
        musicRatings = MusicRating.find({ userId: req.user._id }).lean();
      }
      if (!courseRec) {
        courseRatings = CourseRating.find({ userId: req.user._id }).lean();
      }
      let questionAnswers = QuestionAnswer.find({
        userId: req.user._id
      }).lean();

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
    let books =
      bookRec ||
      Book.find({ _id: { $nin: ratedBooks } }, 'name img')
        .limit(20)
        .lean();
    let movies =
      movieRec ||
      Movie.find({ _id: { $nin: ratedMovies } }, 'name img')
        .limit(20)
        .lean();
    let music =
      musicRec ||
      Music.find({ _id: { $nin: ratedMusic } }, 'name img')
        .limit(20)
        .lean();
    let courses =
      courseRec ||
      Course.find({ _id: { $nin: ratedCourses } }, 'name img')
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
    return res.json({ books, movies, music, courses, questions });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
