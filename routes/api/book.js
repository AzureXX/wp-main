const express = require("express");
const router = express.Router();
const passport = require("passport");
const roles = require("../../utils/roles");
const Book = require("../../models/Book");
const ObjectId = require("mongoose").Types.ObjectId;

//@route   POST api/book/add
//@desc    Adds new book to database
//@access  Private/Moderator
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      const { nameEn, descriptionEn, authors, genres } = req.body;
      const newBook = new Book();
      newBook.name.en = nameEn;
      newBook.description.en = descriptionEn;
      newBook.authors = authors
        ? authors.split(",").map(item => item.trim())
        : null;
      newBook.genres = genres
        ? genres.split(",").map(item => item.trim())
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
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    const { nameEn, descriptionEn, authors, genres } = req.body;
    try {
      const id = new ObjectId(
        ObjectId.isValid(req.params.id) ? req.params.id : "123456789012"
      );
      const book = await Book.findById(id);
      if (!book) throw new Error("No such book exist");
      book.name.en = nameEn;
      book.description.en = descriptionEn;
      book.authors = authors
        ? authors.split(",").map(item => item.trim())
        : null;
      book.genres = genres ? genres.split(",").map(item => item.trim()) : null;
      await book.save();
      res.json("Success");
    } catch (error) {
      next(error);
    }
  }
);

//@route   Delete api/book/delete
//@desc     Delete book from database
//@access  Private/Moderator
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      if (!ObjectId.isValid(req.params.id)) throw new Error("ID is not valid");
      await Book.findByIdAndDelete(req.params.id);
      res.json("Success");
    } catch (error) {
      next(error);
    }
  }
);

//@route   GET api/book/get/all/:page
//@desc    Get all books by page
//@access  Public
router.get("/get/all/:page?", async (req, res, next) => {
  try {
    let page = parseInt(req.params.page);
    const size = 3;
    const offset = (page - 1) * size;
    if (isNaN(page)) page = 1;
    const books = await Book.find()
      .skip(offset)
      .limit(size);
    if(books.length == 0) throw new Error("No such page"); 
    if(books.length < size) res.json({lastPage: true, books});
    res.json({lastPage: false, books});
  } catch (error) {
    next(error);
  }
});

//@route   GET api/book/get/all/
//@desc    Get all books by page
//@access  Public

//@route   GET api/book/get/id/:id
//@desc    Get book by id
//@access  Public
router.get("/get/id/:id", async (req, res, next) => {
  try {
    const id = new ObjectId(
      ObjectId.isValid(req.params.id) ? req.params.id : "123456789012"
    );
    const book = await Book.findById(id);
    if (!book) throw new Error("No such book exist");
    res.json(book);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
