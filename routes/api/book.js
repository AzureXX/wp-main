const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Book = require('../../models/Book');
const transformation = require('../../utils/transformation');
const validation = require('../../utils/validation');

//@route   POST api/book/add
//@desc    Adds new book to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      const { nameUs, descriptionUs, authors, genres } = req.body;
      const newBook = new Book();
      newBook.name.us = nameUs;
      newBook.description.us = descriptionUs;
      newBook.authors = authors
        ? authors.split(',').map(item => item.trim())
        : null;
      newBook.genres = genres
        ? genres.split(',').map(item => item.trim())
        : null;
      const book = await newBook.save();
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
);

//@route   PUT api/book/edit/:id
//@desc    Edit book in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    const { nameUs, descriptionUs, authors, genres } = req.body;
    try {
      const id = transformation.mongooseId(req.params.id);
      const book = await Book.findById(id);
      if (!book) throw new Error('No such book exist');
      book.name.us = nameUs;
      book.description.us = descriptionUs;
      book.authors = authors
        ? authors.split(',').map(item => item.trim())
        : null;
      book.genres = genres ? genres.split(',').map(item => item.trim()) : null;
      await book.save();
      res.json('Success');
    } catch (error) {
      next(error);
    }
  }
);

//@route   Delete api/book/delete
//@desc     Delete book from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      if (!(validation.mongooseId(req.params.id)))
        throw new Error('ID is not valid');
      await Book.findByIdAndDelete(req.params.id);
      res.json('Success');
    } catch (error) {
      next(error);
    }
  }
);

//@route   GET api/book/get/all/:page
//@desc    Get all books by page
//@access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  try {
    let page = parseInt(req.params.page);
    const size = 100;
    if (isNaN(page)) page = 1;
    const offset = (page - 1) * size;
    const books = await Book.find()
      .skip(offset)
      .limit(size);
    if (books.length == 0) throw new Error('No such page');
    if (books.length < size) res.json({ lastPage: true, books });
    res.json({ lastPage: false, books });
  } catch (error) {
    next(error);
  }
});

//@route   GET api/book/get/id/:id
//@desc    Get book by id
//@access  Public
router.get('/get/id/:id', async (req, res, next) => {
  try {
    const id = transformation.mongooseId(req.params.id);
    const book = await Book.findById(id);
    if (!book) throw new Error('No such book exist');

    res.json(book);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
