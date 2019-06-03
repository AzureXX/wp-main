const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');
const Book = require('../../models/Book');
const Course = require('../../models/Course');
const Movie = require('../../models/Movie');
const Person = require('../../models/Person');
const BookRating = require('../../models/Ratings/BookRating');
const MovieRating = require('../../models/Ratings/MovieRating');
const CourseRating = require('../../models/Ratings/CourseRating');
const PersonRating = require('../../models/Ratings/PersonRating');

router.get('/', roles.isUser, async (req, res, next) => {
  try {
    const regex = new RegExp(req.query.search, 'i');
    console.log(regex);
    const search = [
      { 'name.us': regex },
      { 'name.ru': regex },
      { 'name.az': regex },
      { 'description.us': regex },
      { 'description.ru': regex },
      { 'description.az': regex }
    ];
    let books = Book.find({
      $or: search
    }).limit(20);
    let movies = Movie.find({
      $or: search
    }).limit(20);
    let courses = Course.find({
      $or: search
    }).limit(20);
    let people = Person.find({
      $or: search
    }).limit(20);

    books = await books;
    movies = await movies;
    courses = await courses;
    people = await people;
    const ratedBooks = [];
    const ratedMovies = [];
    const ratedCourses = [];
    const ratedPeople = [];
    if (req.user) {
      let bookRating = BookRating.findOne({ userId: req.user.id });
      let movieRating = MovieRating.findOne({ userId: req.user.id });
      let courseRating = CourseRating.findOne({ userId: req.user.id });
      let personRating = PersonRating.findOne({ userId: req.user.id });
      bookRating = await bookRating;
      movieRating = await movieRating;
      courseRating = await courseRating;
      personRating = await personRating;

      books.forEach(item => {
        const newItem = JSON.parse(JSON.stringify(item));
        const index = bookRating
          ? bookRating['books'].findIndex(i => {
              return i.id.toString() === item._id.toString();
            })
          : -1;
        if (index > -1) {
          newItem.rating = bookRating['books'][index].rating;
          newItem.status = bookRating['books'][index].status;
        }
        ratedBooks.push(newItem);
      });

      movies.forEach(item => {
        const newItem = JSON.parse(JSON.stringify(item));
        const index = movieRating
          ? movieRating['movies'].findIndex(i => {
              return i.id.toString() === item._id.toString();
            })
          : -1;
        if (index > -1) {
          newItem.rating = movieRating['movies'][index].rating;
          newItem.status = movieRating['movies'][index].status;
        }
        ratedMovies.push(newItem);
      });
      courses.forEach(item => {
        const newItem = JSON.parse(JSON.stringify(item));
        const index = courseRating
          ? courseRating['courses'].findIndex(i => {
              return i.id.toString() === item._id.toString();
            })
          : -1;
        if (index > -1) {
          newItem.rating = courseRating['courses'][index].rating;
          newItem.status = courseRating['courses'][index].status;
        }
        ratedCourses.push(newItem);
      });

      people.forEach(item => {
        const newItem = JSON.parse(JSON.stringify(item));
        const index = personRating
          ? personRating['people'].findIndex(i => {
              return i.id.toString() === item._id.toString();
            })
          : -1;
        if (index > -1) {
          newItem.rating = personRating['people'][index].rating;
          newItem.status = personRating['people'][index].status;
        }
        ratedPeople.push(newItem);
      });
    }
    res.json({
      books: ratedBooks.length > 0 ? ratedBooks : books,
      movies: ratedMovies.length > 0 ? ratedMovies : movies,
      courses: ratedCourses.length > 0 ? ratedCourses : courses,
      people: ratedPeople.length > 0 ? ratedPeople : people
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
