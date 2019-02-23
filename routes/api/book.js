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



module.exports = router;
