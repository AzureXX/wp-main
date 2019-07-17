const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Book = require('../../models/Book');
const BookRating = require('../../models/Ratings/BookRating');
const axios = require('axios');
const requests = require('../../utils/requests');
//@route   POST api/book/add
//@desc    Adds new book to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, Book, 'book');
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
  await requests.getItem(req, res, next, 'books');
});

//@route   POST api/book/rate
//@desc    Rates book
//@access  Private
router.post(
  '/rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.setRating(req, res, next, 'books');
  }
);

router.post(
  '/google',
  passport.authenticate('jwt', { session: false }),
  roles.isAdmin,
  async (req, res, next) => {
    try {
      console.log(req.body)
      if(!req.body.id) throw new Error("You need ID")
      const response = await axios.get(
        'https://www.googleapis.com/books/v1/volumes/'+ req.body.id
      );
      const newBook = new Book({
        name: {
          us: response.data.volumeInfo.title
        },
        description: {
          us: response.data.volumeInfo.description
        },
        ISBN: response.data.volumeInfo.industryIdentifiers[1].identifier,
        img: {
          us:"https://books.google.com/books/content?id="+req.body.id+"&printsec=frontcover&img=1&zoom=1"
        },
        website: {
          us: "https://books.google.az/books?id="+req.body.id
        }
      })
      const book = await newBook.save();
      res.json(book)
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
