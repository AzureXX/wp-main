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
const BookRecommendation = require('../../models/Recommendations/BookRecommendation');
const MovieRecommendation = require('../../models/Recommendations/MovieRecommendation');
const CourseRecommendation = require('../../models/Recommendations/CourseRecommendation');
const MusicRecommendation = require('../../models/Recommendations/MusicRecommendation');
router.get('/initial', roles.isUser, async (req, res, next) => {
  try {
    res.io.emit("hello", { message: "hi"})
    let ratedBooks = [];
    let ratedMovies = [];
    let ratedMusic = [];
    let ratedCourses = [];
    let answeredQuestion = [];
    let bookRec, movieRec, musicRec, courseRec;

    if (req.user._id) {
      [bookRec, movieRec, musicRec, courseRec] = await Promise.all([
        BookRecommendation.findOne({ userId: req.user._id })
          .lean()
          .populate({path:'books.data', select: "name img"}),
        MovieRecommendation.findOne({ userId: req.user._id })
          .lean()
          .populate({path:'movies.data', select: "name img"}),
        MusicRecommendation.findOne({ userId: req.user._id })
          .lean()
          .populate({path:'music.data', select: "name img"}),
        CourseRecommendation.findOne({ userId: req.user._id })
          .lean()
          .populate({path:'courses.data', select: "name img"})
      ]);
      
      bookRec = bookRec && bookRec.books.map(item => item.data).slice(0, 20);
      movieRec = movieRec && movieRec.movies.map(item => item.data).slice(0, 20);
      musicRec = musicRec && musicRec.music.map(item => item.data).slice(0, 20);
      courseRec = courseRec && courseRec.courses.map(item => item.data).slice(0, 20);
      let bookRatings, movieRatings, musicRatings, courseRatings
      if(!bookRec) {
        bookRatings = BookRating.find({ userId: req.user._id }).lean();
      }
      if(!movieRec) {
         movieRatings = MovieRating.find({ userId: req.user._id }).lean();
      }
      if(!musicRec) {
         musicRatings = MusicRating.find({ userId: req.user._id }).lean();
      }
      if(!courseRec) {
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
      Book.find({ _id: { $nin: ratedBooks } }, "name img")
        .limit(20)
        .lean();
    let movies =
      movieRec ||
      Movie.find({ _id: { $nin: ratedMovies } }, "name img")
        .limit(20)
        .lean();
    let music =
      musicRec ||
      Music.find({ _id: { $nin: ratedMusic } }, "name img")
        .limit(20)
        .lean();
    let courses =
      courseRec ||
      Course.find({ _id: { $nin: ratedCourses } }, "name img")
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
