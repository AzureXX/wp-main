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
    async(req, res, next) => {
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
                tags,
                img
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
                authors: author ?
                    author.split(',').map(item => {
                        return transformation.mongooseId(item.trim());
                    }) : null,
                genres: genres ? genres.split(',').map(item => item.trim()) : null,
                ISBN: isbn,
                published: published,
                publisher: publisher ?
                    publisher.split(',').map(item => {
                        return transformation.mongooseId(item.trim());
                    }) : null,
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
                img: {
                    us: img ? img.us : null,
                    ru: img ? img.ru : null,
                    az: img ? img.az : null
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
    async(req, res, next) => {
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
            img,
            tags
        } = req.body;
        try {
            const id = transformation.mongooseId(req.params.id);
            const book = await Book.findById(id);
            if (!book) throw new Error('No such book exist');

            book.name.us = name ? name.us : null;
            book.name.ru = name ? name.ru : null;
            book.name.az = name ? name.az : null;
            book.description.us = description ? description.us : null;
            book.description.ru = description ? description.ru : null;
            book.description.az = description ? description.az : null;
            book.authors = authors ?
                authors.split(',').map(item => {
                    return transformation.mongooseId(item.trim());
                }) :
                null;
            book.genres = genres ? genres.split(',').map(item => item.trim()) : null;
            book.ISBN = isbn;
            book.published = published;
            book.publisher = publisher ?
                publisher.split(',').map(item => {
                    return transformation.mongooseId(item.trim());
                }) :
                null;
            book.wikipediaLink.us = wikipediaLink ? wikipediaLink.us : null;
            book.wikipediaLink.ru = wikipediaLink ? wikipediaLink.ru : null;
            book.wikipediaLink.az = wikipediaLink ? wikipediaLink.az : null;
            book.website.us = website ? website.us : null;
            book.website.ru = website ? website.ru : null;
            book.website.az = website ? website.az : null;
            book.img.us = img ? img.us : null;
            book.img.ru = img ? img.ru : null;
            book.img.az = img ? img.az : null;
            book.tags = tags ? tags.split(',').map(item => item.trim()) : null;


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

module.exports = router;