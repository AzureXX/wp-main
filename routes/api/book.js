const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Book = require('../../models/Book');
const axios = require('axios');
const requests = require('../../utils/requests');
const sanitizeHTML = require('sanitize-html');
//@route   POST api/book/add
//@desc    Adds new book to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', {
    session: false
  }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, 'book');
  }
);

//@route   PUT api/book/edit/:id
//@desc    Edit book in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, 'book');
  }
);

//@route   DELETE api/book/delete/:id
//@desc     Delete book from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, 'book');
  }
);

//@route   GET api/book/get/all/:page
//@desc    Get all books by page
//@access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'books', 20);
});

//@route   GET api/book/get/id/:id
//@desc    Get book by id
//@access  Public
router.get('/get/id/:id', async (req, res, next) => {
  await requests.getItem(req, res, next, 'books');
});

router.post(
  '/google',
  passport.authenticate('jwt', {
    session: false
  }),
  roles.isAdmin,
  async (req, res, next) => {
    try {
      if (!req.body.id) throw new Error('id.required');
      const exist = await Book.findOne({
        "website.us": 'https://books.google.com/books?id=' + req.body.id
      }, "_id").lean()
      if (exist) throw new Error("book.exist")
      const response = await axios.get(
        'https://www.googleapis.com/books/v1/volumes/' + req.body.id
      );
      const description = req.body.withDescription ?  sanitizeHTML(response.data.volumeInfo.description, {
        allowedTags: []
      }) : null;
      const genres = req.body.genres ?
        req.body.genres.split(',').map(i => i.trim().toLowerCase()) :
        null;
      const tags = {}
      if (genres) {
        genres.forEach(genre => {
          tags[genre.toLowerCase().split(" ").join("_")] = 3
        })
      }

      const newBook = new Book({
        name: {
          us: req.body.customName || response.data.volumeInfo.title
        },
        description: {
          us: description
        },
        ISBN: req.body.customIsbn || response.data.volumeInfo.industryIdentifiers[1].identifier,
        img: {
          us: 'https://books.google.com/books/content?id=' +
            req.body.id +
            '&printsec=frontcover&img=1&zoom=1'
        },
        website: {
          us: 'https://books.google.com/books?id=' + req.body.id
        },
        published: req.body.published,
        genres: genres,
        tags: tags
      });
      const book = await newBook.save();
      return res.json(book);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;