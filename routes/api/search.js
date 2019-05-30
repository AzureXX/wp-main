const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');
const Book = require('../../models/Book');

router.get("/:query", roles.isUser, async (req,res,next)=> {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error)
  }
})

module.exports = router;