const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');
const Music = require("../../models/Music")
const axios = require('axios');

//@route   POST api/music/add
//@desc    Adds new music to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, 'music');
  }
);

//@route   PUT api/music/edit/:id
//@desc    Edit music in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, 'music');
  }
);

//@route   DELETE api/music/delete/:id
//@desc     Delete music from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, "music");
  }
);

//@route   GET api/music/get/all/:page
//@desc    Get all music by page
//@access  Public
router.get('/get/all/:page?',  async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'music', 20);
});

//@route   GET api/music/get/id/:id
//@desc    Get music by id
//@access  Public
router.get('/get/id/:id',  async (req, res, next) => {
  await requests.getItem(req, res, next, 'music');
});

//@route   POST api/music/youtube
//@desc    Add music using yyoutube api
//@access  Public
router.post('/youtube',  async (req, res, next) => {
 try {
   const {id} = req.body;
   if (!id) throw new Error("id.required")
   const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
     params: {
       id: id,
       part: "snippet",
       key: process.env.YOUTUBE_API_KEY
     }
   })
   const genres = req.body.genres
        ? req.body.genres.split(',').map(i => i.trim().toLowerCase())
        : null;
      const tags = {}
      if(genres) {
        genres.forEach(genre => {
          tags[genre.toLowerCase().split(" ").join("_")] = 3
        })
      }
   const data = response.data.items[0]
   const musicObj = new Music({
     name: data.snippet.title,
     video: id,
     released: data.snippet.publishedAt,
     img: data.snippet.thumbnails.medium.url,
     genres: genres,
     tags: tags
   })
   const music = await musicObj.save()
   res.json(music);
 } catch (error) {
   next(error)
 }
});

module.exports = router;
