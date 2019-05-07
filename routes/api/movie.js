const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Movie = require('../../models/Movie');
const MovieRating = require('../../models/Ratings/MovieRating');
const transformation = require('../../utils/transformation');
const validation = require('../../utils/validation');
const requests = require('../../utils/requests');

//@route   POST api/movie/add
//@desc    Adds new movie to database
//@access  Private/Moderator
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    roles.isModerator,
    async(req, res, next) => {
        try {
            const newMovie = new Movie(transformation.getMovieObject(req.body));
            const movie = await newMovie.save();
            res.status(200).json(movie);
        } catch (error) {
            next(error);
        }
    }
);

//@route   PUT api/movie/edit/:id
//@desc    Edit movie in database
//@access  Private/Moderator
router.put(
    '/edit/:id',
    passport.authenticate('jwt', { session: false }),
    roles.isModerator,
    async(req, res, next) => {
        try {
            const id = transformation.mongooseId(req.params.id);
            const movie = await Movie.findById(id);
            if (!movie) throw new Error('No such movie exist');

            const saved = await Movie.findByIdAndUpdate(
                id,
                transformation.getMovieObject(req.body), { new: true }
            );
            res.status(200).json(saved);
        } catch (error) {
            next(error);
        }
    }
);

//@route   Delete api/movie/delete
//@desc     Delete movie from database
//@access  Private/Moderator
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    roles.isModerator,
    async(req, res, next) => {
        try {
            if (!validation.mongooseId(req.params.id))
                throw new Error('ID is not valid');
            await Movie.findByIdAndDelete(req.params.id);
            res.json('Success');
        } catch (error) {
            next(error);
        }
    }
);

//@route   GET api/movie/get/all/:page
//@desc    Get all movies by page
//@access  Public
router.get('/get/all/:page?', async(req, res, next) => {
    await requests.getAllItems(req, res, next, Movie, "movies", MovieRating, 20)
});

//@route   GET api/movie/get/id/:id
//@desc    Get movie by id
//@access  Public
router.get('/get/id/:id', async(req, res, next) => {
    await requests.getItem(req, res, next, Movie, 'movies', MovieRating);
});

//@route   POST api/course/rate
//@desc    Rates movie
//@access  Private
router.post(
    '/rate',
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            await requests.setRating(MovieRating, "movies", req);
            res.json("success");
        } catch (error) {
            next(error);
        }
    }
);
module.exports = router;