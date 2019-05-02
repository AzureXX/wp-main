const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Book = require('../../models/Book');
const BookRating = require('../../models/Ratings/BookRating');
const transformation = require('../../utils/transformation');
const validation = require('../../utils/validation');

//@route   POST api/book/add
//@desc    Adds new book to database
//@access  Private/Moderator
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    roles.isModerator,
    async(req, res, next) => {
        try {
            const newBook = new Book(transformation.getBookObject(req.body));

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
    async(req, res, next) => {
        try {
            const id = transformation.mongooseId(req.params.id);
            const book = await Book.findById(id);
            if (!book) throw new Error('No such book exist');
            const saved = await Book.findByIdAndUpdate(
                id,
                transformation.getBookObject(req.body), { new: true }
            );

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
    async(req, res, next) => {
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
router.get('/get/all/:page?', async(req, res, next) => {
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
router.get('/get/id/:id', async(req, res, next) => {
    try {
        const id = transformation.mongooseId(req.params.id);
        const book = await Book.findById(id);
        if (!book) throw new Error('No such book exist');

        res.json(book);
    } catch (error) {
        next(error);
    }
});

router.post(
    '/rate',
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            let { rating, status, id } = req.body;
            if (rating) status = 0;
            else if (status) rating = 0;

            //gets current ratings of user
            const ratings = await BookRating.findOne({ userId: req.user.id, 'books.id': id });

            if (!ratings) { // if book is not rated by this user yet 
                await BookRating.updateOne({ userId: req.user.id }, { userId: req.user.id, $push: { books: { id, rating, status } } }, { upsert: true });
            } else { // if book already rated by this user 
                await BookRating.updateOne({ userId: req.user.id, 'books.id': id }, {
                    $set: {
                        'books.$': { id, rating, status }
                    }
                });
            }
            res.json(get);
        } catch (error) {
            next(error);
        }
    }
);
module.exports = router;