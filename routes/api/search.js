const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');
const Book = require('../../models/Book');
const Course = require('../../models/Course');
const Movie = require('../../models/Movie');
const Person = require('../../models/Person');

router.get('/', roles.isUser, async (req, res, next) => {
  try {
    const regex = new RegExp(req.query.search, "i");
    console.log(regex);
    const search = [
      {"name.us": regex},
      {"name.ru": regex},
      {"name.az": regex},
      {"description.us": regex},
      {"description.ru": regex},
      {"description.az": regex},
    ]
    let books =  Book.find({
      $or: search
    }).limit(20);
    let movies =  Movie.find({
      $or: search
    }).limit(20);
    let courses =  Course.find({
      $or: search
    }).limit(20);
    let people =  Person.find({
      $or: search
    }).limit(20);
    books = await books;
    movies = await movies;
    courses = await courses;
    people = await people;
    res.json({
      books,movies,courses,people
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
