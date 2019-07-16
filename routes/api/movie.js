const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Movie = require('../../models/Movie');
const MovieRating = require('../../models/Ratings/MovieRating');
const axios = require('axios');
const requests = require('../../utils/requests');

//@route   POST api/movie/add
//@desc    Adds new movie to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, Movie, 'movie');
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
    await requests.editItem(req, res, next, Movie, 'movie');
  }
);

//@route   DELETE api/movie/delete/:id
//@desc     Delete movie from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, Movie);
  }
);

//@route   GET api/movie/get/all/:page
//@desc    Get all movies by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(req, res, next, Movie, 'movies', MovieRating, 20);
});

//@route   GET api/movie/get/id/:id
//@desc    Get movie by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, 'movies');
});

//@route   POST api/course/rate
//@desc    Rates movie
//@access  Private
router.post(
  '/rate',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.setRating(req, res, next, MovieRating, 'movies');
  }
);

router.post(
  '/tmdb',
  passport.authenticate('jwt', { session: false }),
  roles.isAdmin,
  async (req, res, next) => {
    try {
      if (!req.body.id) throw new Error('You need Id');
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/' +
          req.body.id +
          '?api_key=ca8f1fea6bfe2ee1300c1465e40444d9'
      );
      const newMovie = new Movie({
        name: {
          us: response.data.title
        },
        website: {
          us: "https://www.themoviedb.org/movie/" + req.body.id
        },
        description: {
          us: response.data.overview
        },
        duration: response.data.runtime,
        img: {
          us: 'https://image.tmdb.org/t/p/original/' + response.data.poster_path
        },
        released: response.data.release_date
      });
      const movie = await newMovie.save();
      res.json(movie)
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
