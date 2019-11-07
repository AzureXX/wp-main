const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Movie = require('../../models/Movie');
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
    await requests.createItem(req, res, next, 'movie');
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
    await requests.editItem(req, res, next, 'movie');
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
    await requests.deleteItem(req, res, next, "movie");
  }
);

//@route   GET api/movie/get/all/:page
//@desc    Get all movies by page
//@access  Public
router.get('/get/all/:page?',  async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'movies', 20);
});

//@route   GET api/movie/get/id/:id
//@desc    Get movie by id
//@access  Public
router.get('/get/id/:id',  async (req, res, next) => {
  await requests.getItem(req, res, next, 'movies');
});



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
      const exist = await Movie.findOne({"name.us": response.data.title})
      if(exist) throw new Error("Movie already exists")
      const tags = {}
      response.data.genres.forEach(genre => {
        tags[genre.name.toLowerCase().split(" ").join("_")] = 3
      })
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
          us: 'https://image.tmdb.org/t/p/w300/' + response.data.poster_path
        },
        released: response.data.release_date,
        genres: response.data.genres.map(genre => genre.name.toLowerCase().split(" ").join("_")),
        tags: tags
      });
      const movie = await newMovie.save();
      return res.json(movie)
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
