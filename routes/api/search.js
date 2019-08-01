const express = require('express');
const router = express.Router();
const Book = require('../../models/Book');
const Course = require('../../models/Course');
const Movie = require('../../models/Movie');
const Person = require('../../models/Person');
const {getModel} = require("../../utils/transformation")

const searchOptions = (regex) => ([
  { 'name.us': regex },
  { 'name.ru': regex },
  { 'name.az': regex }
])
router.get('/',  async (req, res, next) => {
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

    res.json({
      books: books,
      movies: movies,
      courses: courses,
      people: people
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:type',  async (req, res, next) => {
  try {
    const types = ["books", "movies", "courses", "people","categories", "subcategories", "topics", "subtopics"]
    if(!types.includes(req.params.type)) throw new Error("Invalid search type")
    const regex = new RegExp(req.query.search, 'i');
    const search = searchOptions(regex);
    const Model = getModel(req.params.type)
    let items = await Model.find({
      $or: search
    }, "name").limit(20);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
