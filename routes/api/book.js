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
      const {
        name,
        description,
        author,
        genres,
        isbn,
        published,
        publisher,
        wikipediaLink,
        website,
        tags
      } = req.body;
      console.log(req.body);
      const newBook = new Book({
        name: {
          us: name ? name.us : null,
          ru: name ? name.ru : null,
          az: name ? name.az : null
        },
        description: {
          us: description ? description.us : null,
          ru: description ? description.ru : null,
          az: description ? description.az : null
        },
        authors: author
          ? author.split(',').map(item => {
              return transformation.mongooseId(item.trim());
            })
          : null,
        genres: genres ? genres.split(',').map(item => item.trim()) : null,
        ISBN: isbn,
        published: published,
        publisher: publisher
          ? publisher.split(',').map(item => {
              return transformation.mongooseId(item.trim());
            })
          : null,
        wikipediaLink: {
          us: wikipediaLink ? wikipediaLink.us : null,
          ru: wikipediaLink ? wikipediaLink.ru : null,
          az: wikipediaLink ? wikipediaLink.az : null
        },
        website: {
          us: website ? website.us : null,
          ru: website ? website.ru : null,
          az: website ? website.az : null
        },
        tags: tags ? tags.split(',').map(item => item.trim()) : null
      });

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
    const {
      name,
      description,
      authors,
      genres,
      isbn,
      published,
      publisher,
      wikipediaLink,
      website,
      tags
    } = req.body;
    try {
      const id = transformation.mongooseId(req.params.id);
      let book = await Book.findById(id);
      if (!book) throw new Error('No such book exist');
      book = {
        ...book,
        ...{
          name: {
            us: name ? name.us : null,
            ru: name ? name.ru : null,
            az: name ? name.az : null
          },
          description: {
            us: description ? description.us : null,
            ru: description ? description.ru : null,
            az: description ? description.az : null
          },
          authors: authors ? authors.split(',').map(item => item.trim()) : null,
          genres: genres ? genres.split(',').map(item => item.trim()) : null,
          ISBN: isbn,
          published: published,
          publisher: publisher
            ? publisher.split(',').map(item => item.trim())
            : null,
          wikipediaLink: {
            us: wikipediaLink ? wikipediaLink.us : null,
            ru: wikipediaLink ? wikipediaLink.ru : null,
            az: wikipediaLink ? wikipediaLink.az : null
          },
          website: {
            us: website ? website.us : null,
            ru: website ? website.ru : null,
            az: website ? website.az : null
          },
          tags: tags ? tags.split(',').map(item => item.trim()) : null
        }
      };
      const saved = await book.save();
      res.status(200).json(saved);
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
      if (!validation.mongooseId(req.params.id))
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
