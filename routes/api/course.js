const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');
const axios = require('axios');
const Course = require("../../models/Course")
//@route   POST api/course/add
//@desc    Adds new course to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, 'course');
  }
);

//@route   PUT api/course/edit/:id
//@desc    Edit course in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, 'course');
  }
);

//@route   DELETE api/course/delete/:id
//@desc     Delete course from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, "course");
  }
);

//@route   GET api/course/get/all/:page
//@desc    Get all courses by page
//@access  Public
router.get('/get/all/:page?',  async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'courses', 20);
});

//@route   GET api/course/get/id/:id
//@desc    Get course by id
//@access  Public
router.get('/get/id/:id',  async (req, res, next) => {
  await requests.getItem(req, res, next, 'courses');
});

//@route   POST api/course/udemy
//@desc    Adds new course to database from udemy
//@access  Private/Moderator
router.post(
  '/udemy',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      if(!req.body.link) throw new Error("course.nolink")
      const courses = await axios.get("https://www.udemy.com/api-2.0/courses/", {
        params: {search: req.body.link},
        "headers": {
          "Authorization" : process.env.UDEMY_TOKEN
        }
      })
      const index  = courses.data.results.findIndex(course => "/course/"+ req.body.link + "/" === course.url
      )
      let genres = req.body.genres ?  req.body.genres.split(",").map(genre => genre.trim().toLowerCase()) : []
      
      const data = courses.data.results[index]
      genres.push(data.is_paid ?  "paid" : "free");
      const tags = {};
      if(genres) {
        genres.forEach(genre => {
          tags[genre.toLowerCase().split(" ").join("_")] = 3
        })
      }
      const course = new Course({
        name: {
          us: data.title
        },
        link: {
          us: "https://www.udemy.com" + data.url
        },
        description: {
          us: data.headline
        },
        img: {
          us: data.image_480x270
        },
        genres,
        tags
      })
      await course.save();
      return res.json("success")
    } catch (error) {
      next(error)
    }
  }
);

//@route   GET api/course/edx
//@desc    GET access token for edx
//@access  Private/Moderator
router.get(
  '/edx',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      const token = await axios.post("https://api.edx.org/oauth2/v1/access_token", {
        "client_id": process.env.EDX_CLIENT_ID,
        "client_secret": process.env.EDX_CLIENT_SECRET,
        "grant_type": "client_credentials",
        "token_type": "jwt"
      })
      res.json(token)
    } catch (error) {
      next(error)
    }
  })
module.exports = router;
