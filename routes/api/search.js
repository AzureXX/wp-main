const express = require('express');
// custom modules
const { getModel } = require('../../utils/models');
// custom function
const searchOptions = regex => [{ 'name.us': regex }, { 'name.ru': regex }, { 'name.az': regex }];
// models
const Book = require('../../models/Book');
const Course = require('../../models/Course');
const Movie = require('../../models/Movie');
const Person = require('../../models/Person');
const User = require('../../models/User');

const router = express.Router();
// @route   GET api/search?search=...
// @desc    Adds new questionnaire to database
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const regex = new RegExp(req.query.search, 'i');
    const search = [
      { 'name.us': regex },
      { 'name.ru': regex },
      { 'name.az': regex },
      { 'description.us': regex },
      { 'description.ru': regex },
      { 'description.az': regex }
    ];
    const Category = getModel('categories');
    const Subcategory = getModel('subcategories');
    const Topic = getModel('topics');
    const Subtopic = getModel('subtopics');
    const Music = getModel('music');
    let categories = Category.find(
      {
        $or: search
      },
      'name img'
    )
      .limit(20)
      .lean();
    let subcategories = Subcategory.find(
      {
        $or: search
      },
      'name img'
    )
      .limit(20)
      .lean();
    let topics = Topic.find(
      {
        $or: search
      },
      'name img'
    )
      .limit(20)
      .lean();
    let subtopics = Subtopic.find(
      {
        $or: search
      },
      'name img'
    )
      .limit(20)
      .lean();

    let books = Book.find(
      {
        $or: search
      },
      'name img description'
    )
      .limit(20)
      .lean();
    let movies = Movie.find(
      {
        $or: search
      },
      'name img description'
    )
      .limit(20)
      .lean();
    let courses = Course.find(
      {
        $or: search
      },
      'name img description'
    )
      .limit(20)
      .lean();
    let people = Person.find(
      {
        $or: search
      },
      'name img description'
    )
      .limit(20)
      .lean();
    let music = Music.find(
      {
        name: regex
      },
      'name img'
    )
      .limit(20)
      .lean();

    categories = await categories;
    subcategories = await subcategories;
    topics = await topics;
    subtopics = await subtopics;
    books = await books;
    movies = await movies;
    music = await music;
    courses = await courses;
    people = await people;

    return res.json({
      books,
      movies,
      music,
      courses,
      people,
      categories,
      subcategories,
      topics,
      subtopics
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET api/search/:type
// @desc    Filter search results by type
// @access  Public
router.get('/:type', async (req, res, next) => {
  try {
    const types = ['books', 'movies', 'courses', 'people', 'categories', 'subcategories', 'topics', 'subtopics', 'users', 'education', 'music'];

    if (!types.includes(req.params.type)) throw new Error('search.invalidtype');

    const regex = new RegExp(req.query.search, 'i');
    const search = searchOptions(regex);

    if (req.params.type === 'users') {
      const users = await User.find({ username: regex }, 'username').lean();
      return res.json(users);
    } else if (req.params.type === 'education') {
      const Category = getModel('categories');
      const Subcategory = getModel('subcategories');
      const Topic = getModel('topics');
      const Subtopic = getModel('subtopics');
      let categories = Category.find(
        {
          $or: search
        },
        'name'
      )
        .limit(20)
        .lean();
      let subcategories = Subcategory.find(
        {
          $or: search
        },
        'name'
      )
        .limit(20)
        .lean();
      let topics = Topic.find(
        {
          $or: search
        },
        'name'
      )
        .limit(20)
        .lean();
      let subtopics = Subtopic.find(
        {
          $or: search
        },
        'name'
      )
        .limit(20)
        .lean();
      categories = await categories;
      subcategories = await subcategories;
      topics = await topics;
      subtopics = await subtopics;
      return res.json({ categories, subcategories, topics, subtopics });
    } else if (req.params.type === 'music') {
      const Music = getModel('music');
      let music = await Music.find(
        {
          name: regex
        },
        'name'
      )
        .limit(20)
        .lean();
      return res.json(music);
    } else {
      const Model = getModel(req.params.type);
      let items = await Model.find(
        {
          $or: search
        },
        'name'
      )
        .limit(20)
        .lean();
      return res.json(items);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
