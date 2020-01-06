const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Movie = require('../../models/Movie');
const axios = require('axios');
const requests = require('../../utils/requests');


const tmdbGenres = {
    28: "action",
    12:"adventure",
    16: "animation",
    35: "comedy",
    80: "crime",
    99: "documentary",
    18: "drama",
    10751: "family",
    14: "fantasy",
    36: "history",
    27: 'horror',
    10402: "music",
    9648: "mystery",
    10749: "romance",
    878: "science_fiction",
    10770: "tv_movie",
    53: "thriller",
    10752: "war",
    37: "western"
}
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
      if (!req.body.id) throw new Error("id.required");
      const exist = await Movie.findOne({"mdbId": req.body.id}, "_id").lean()
      if(exist) throw new Error("movie.exist")
      
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/' +
          req.body.id +
          '?api_key=ca8f1fea6bfe2ee1300c1465e40444d9'
      );
      
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
          us: response.data.poster_path || 'https://image.tmdb.org/t/p/w300/' + response.data.poster_path
        },
        released: response.data.release_date,
        genres: response.data.genres.map(genre => genre.name.toLowerCase().split(" ").join("_")),
        tags: tags,
        tmdbId: req.body.id
      });
      const movie = await newMovie.save();
      return res.json(movie)
    } catch (error) {
      next(error);
    }
  }
);

// router.post(
//   '/masstmdb',
//   passport.authenticate('jwt', { session: false }),
//   roles.isAdmin,
//   async (req, res, next) => {
//     try {
//       for(let i = 1; i < 362; i+=5) {
//         console.log(i);
//         const [first, second, third, forth, fifth] = await Promise.all([axios.get(
//           "https://api.themoviedb.org/3/discover/movie?api_key=ca8f1fea6bfe2ee1300c1465e40444d9&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=100&page=" + i
//         ), axios.get(
//           "https://api.themoviedb.org/3/discover/movie?api_key=ca8f1fea6bfe2ee1300c1465e40444d9&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=100&page=" + (i + 1)
//         ),
//         axios.get(
//           "https://api.themoviedb.org/3/discover/movie?api_key=ca8f1fea6bfe2ee1300c1465e40444d9&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=100&page=" + (i + 2)
//         ),
//         axios.get(
//           "https://api.themoviedb.org/3/discover/movie?api_key=ca8f1fea6bfe2ee1300c1465e40444d9&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=100&page=" + (i + 3)
//         ),
//         axios.get(
//           "https://api.themoviedb.org/3/discover/movie?api_key=ca8f1fea6bfe2ee1300c1465e40444d9&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=100&page=" + (i + 4)
//         )]);
//         let movies = [...first.data.results, ...second.data.results, ...third.data.results, ...forth.data.results, ...fifth.data.results]
//         movies = movies.map(movie => {
//           const tags = {}
//           const genres = movie.genre_ids.map(id => tmdbGenres[id])
//           genres.forEach(genre => {
//             tags[genre] = 3
//           })
//           return {
//             name: {
//               us: movie.title
//             },
//             website: {
//               us: "https://www.themoviedb.org/movie/" + movie.id
//             },
//             description: {
//               us: movie.overview
//             },
//             img: {
//               us: movie.poster_path && 'https://image.tmdb.org/t/p/w300/' + movie.poster_path
//             },
//             released: movie.release_date,
//             genres: genres,
//             tags: tags,
//             tmdbId: movie.id
//           }
//         })
//         await Movie.insertMany(movies);
//       }
      
      
      
//       return res.json("success")
//     } catch (error) {
//       console.log(error)
//       next(error);
//     }
//   }
// );
module.exports = router;
