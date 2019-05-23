const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Book = require('../../models/Book');
const BookRating = require('../../models/Ratings/BookRating');

const requests = require('../../utils/requests');
//@route   POST api/book/add
//@desc    Adds new book to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isBusiness,
  async (req, res, next) => {
    await requests.createItem(req, res, next, Book, 'vacancy');
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
    await requests.editItem(req, res, next, Book, 'book');
  }
);

//@route   DELETE api/book/delete/:id
//@desc     Delete book from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, Book);
  }
);

//@route   GET api/book/get/all/:page
//@desc    Get all books by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(req, res, next, Book, 'books', BookRating, 20);
});

//@route   GET api/book/get/id/:id
//@desc    Get book by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, Book, 'books', BookRating);
});

//@route   POST api/book/rate
//@desc    Rates book
//@access  Private
router.post(
  '/rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.setRating(req, res, next, BookRating, 'books');
  }
);



module.exports = router;