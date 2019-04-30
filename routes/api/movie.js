const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Movie = require('../../models/Movie');
const transformation = require('../../utils/transformation');
const validation = require('../../utils/validation');

//@route   POST api/movie/add
//@desc    Adds new movie to database
//@access  Private/Moderator
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    roles.isModerator,
    async(req, res, next) => {
        const { name, description, actors, genres } = req.body;
        try {
            const newMovie = new Movie();
            newMovie.name = name;
            newMovie.description = description;
            newMovie.actors = actors ?
                actors.split(',').map(item => {
                    return transformation.mongooseId(item.trim());
                }) :
                null;
            newMovie.genres = genres ?
                genres.split(',').map(item => item.trim()) :
                null;
            newMovie.crew = crew.map(item => ({
                type: item.type,
                id: transformation.mongooseId(item.id.trim())
            }));
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
        const { name, description, actors, genres } = req.body;
        try {
            const id = transformation.mongooseId(req.params.id);
            const movie = await Movie.findById(id);
            if (!movie) throw new Error('No such movie exist');
            movie.name = name;
            movie.description = description;
            movie.actors = actors ?
                actors.split(',').map(item => {
                    return transformation.mongooseId(item.trim());
                }) :
                null;
            movie.genres = genres ? genres.split(',').map(item => item.trim()) : null;
            const saved = await movie.save();
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
    try {
        let page = parseInt(req.params.page);
        const size = 100;
        if (isNaN(page)) page = 1;
        const offset = (page - 1) * size;
        if (isNaN(page)) page = 1;
        const movies = await Movie.find()
            .skip(offset)
            .limit(size);
        if (movies.length == 0) throw new Error('No such page');
        if (movies.length < size) res.json({ lastPage: true, movies });
        res.json({ lastPage: false, movies });
    } catch (error) {
        next(error);
    }
});

//@route   GET api/movie/get/id/:id
//@desc    Get movie by id
//@access  Public
router.get('/get/id/:id', async(req, res, next) => {
    try {
        const id = transformation.mongooseId(req.params.id);
        const movie = await Movie.findById(id);
        if (!movie) throw new Error('No such movie exist');
        res.json(movie);
    } catch (error) {
        next(error);
    }
});

module.exports = router;