const express = require("express");
const router = express.Router();
const passport = require("passport");
const roles = require("../../utils/roles");
const Book = require("../../models/Book");

//@route   POST api/book/add
//@desc    Adds new book to database
//@access  Private/Moderator
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      const {nameEn, descriptionEn, authors, genres} = req.body;
      const newBook = new Book();
      newBook.name.en = nameEn;
      newBook.description.en = descriptionEn;
      newBook.authors = authors.split(",").map(item => item.trim());
      newBook.genres = genres.split(",").map(item => item.trim());
      const book = await newBook.save();
      res.status(200).json(book);
    } catch (error) {
      next(error)
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
    res.json("Success");
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
    res.json("Success");
  }
);

//@route   GET api/book/get/all/:page
//@desc    Get all books by page
//@access  Public
router.get("/get/all/:page",  async (req, res, next) => {
  res.json("Success");
})

//@route   GET api/book/get/id/:id
//@desc    Get book by id
//@access  Public
router.get("/get/id/:id",  async (req, res, next) => {
  res.json("Success");
})

module.exports = router;
