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
  async (req, res, next) => {
    try {
      const { nameEn, descriptionEn, actors, genres } = req.body;
      const newMovie = new Movie();
      newMovie.name.en = nameEn;
      newMovie.description.en = descriptionEn;
      newMovie.actors = actors
        ? actors.split(',').map(item => item.trim())
        : null;
      newMovie.genres = genres
        ? genres.split(',').map(item => item.trim())
        : null;
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
  async (req, res, next) => {
    const { nameEn, descriptionEn, actors, genres } = req.body;
    try {
      const id = transformation.mongooseId(req.params.id);
      const movie = await Movie.findById(id);
      if (!movie) throw new Error('No such movie exist');
      movie.name.en = nameEn;
      movie.description.en = descriptionEn;
      movie.authors = authors
        ? authors.split(',').map(item => item.trim())
        : null;
      movie.genres = genres ? genres.split(',').map(item => item.trim()) : null;
      await movie.save();
      res.json('Success');
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
  async (req, res, next) => {
    try {
      if (!(validation.mongooseId(req.params.id)))
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
router.get('/get/all/:page?', async (req, res, next) => {
  try {
    let page = parseInt(req.params.page);
    const size = 3;
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
router.get('/get/id/:id', async (req, res, next) => {
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
