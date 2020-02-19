const express = require('express');
const passport = require('passport');
const axios = require('axios');
const qs = require('querystring');
// custom modules
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');
// edx configs
// const edx = require('../../config/edx.json');
// const edx2 = require('../../config/edx2.json');
// const edx3 = require('../../config/edx3.json');
// const edx4 = require('../../config/edx4.json');
// const final = require('../../config/final.json');
// models
const Course = require('../../models/Course');

const router = express.Router();
// @route   GET api/course/get/all/:page?
// @desc    Get all courses by page
// @access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'courses', 20);
});

// @route   GET api/course/get/id/:id
// @desc    Get course by id
// @access  Public
router.get('/get/id/:id', async (req, res, next) => {
  await requests.getItem(req, res, next, 'courses');
});

// @route   GET api/course/edx
// @desc    Get access token for edx
// @access  Private/Moderator
router.get('/edx', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  try {
    const token = await axios.post(
      'https://api.edx.org/oauth2/v1/access_token',
      qs.stringify({
        client_id: process.env.EDX_CLIENT_ID,
        client_secret: process.env.EDX_CLIENT_SECRET,
        grant_type: 'client_credentials',
        token_type: 'jwt'
      }),
      { 'Content-Type': 'application/x-www-form-urlencoded' }
    );
    res.json(token.data);
  } catch (error) {
    next(error);
  }
});

// @route   POST api/course/add
// @desc    Adds new course to database
// @access  Private/Moderator
router.post('/add', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.createItem(req, res, next, 'course');
});

// @route   POST api/course/udemy
// @desc    Adds new course to database from udemy
// @access  Private/Moderator
router.post('/udemy', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  try {
    if (!req.body.link) throw new Error('course.nolink');
    const courses = await axios.get('https://www.udemy.com/api-2.0/courses/', {
      params: { search: req.body.link },
      headers: {
        Authorization: process.env.UDEMY_TOKEN
      }
    });
    const index = courses.data.results.findIndex(course => '/course/' + req.body.link + '/' === course.url);
    let genres = req.body.genres ? req.body.genres.split(',').map(genre => genre.trim().toLowerCase()) : [];

    const data = courses.data.results[index];
    if (!data) throw new Error('No such course');
    genres.push(data.is_paid ? 'paid' : 'free');
    genres.push('udemy');
    genres.push('online');
    genres.push('video');
    const tags = {};
    if (genres) {
      genres.forEach(genre => {
        tags[
          genre
            .toLowerCase()
            .split(' ')
            .join('_')
        ] = 3;
      });
    }
    const course = new Course({
      name: {
        us: data.title
      },
      link: {
        us: 'https://www.udemy.com' + data.url
      },
      description: {
        us: data.headline
      },
      img: {
        us: data.image_480x270
      },
      genres,
      tags
    });
    await course.save();
    return res.json('success');
  } catch (error) {
    next(error);
  }
});

// @route   POST api/course/edx
// @desc    Adds new course to database from edx
// @access  Private/Moderator
// router.post(
//   '/edx',
//   passport.authenticate('jwt', { session: false }),
//   roles.isModerator,
//   async (req, res, next) => {
//     try {
//       courses = edx.results.map(course => ({
//         name: course.title,
//         description: course.short_description,
//         language: course.course_runs.map(run => run.content_language),
//         level: course.level_type,
//         subjects: course.subjects.map(sub => sub.name),
//         img: course.image && course.image.src,
//         video: course.video && course.video.src,
//         url: course.course_runs[0].marketing_url.split("?utm")[0]
//       }))
//       courses2 = edx2.results.map(course => ({
//         name: course.title,
//         description: course.short_description,
//         language: course.course_runs.map(run => run.content_language),
//         level: course.level_type,
//         subjects: course.subjects.map(sub => sub.name),
//         img: course.image && course.image.src,
//         video: course.video && course.video.src,
//         url: course.course_runs[0].marketing_url.split("?utm")[0]
//       }))
//       courses3 = edx3.results.map(course => ({
//         name: course.title,
//         description: course.short_description,
//         language: course.course_runs.map(run => run.content_language),
//         level: course.level_type,
//         subjects: course.subjects.map(sub => sub.name),
//         img: course.image && course.image.src,
//         video: course.video && course.video.src,
//         url: course.course_runs[0].marketing_url.split("?utm")[0]
//       }))
//       courses4 = edx4.results.map(course => ({
//         name: course.title,
//         description: course.short_description,
//         language: course.course_runs.map(run => run.content_language),
//         level: course.level_type,
//         subjects: course.subjects.map(sub => sub.name),
//         img: course.image && course.image.src,
//         video: course.video && course.video.src,
//         url: course.course_runs[0].marketing_url.split("?utm")[0]
//       }))
//       const all = [...courses, ...courses2, ...courses3, ...courses4]

//       .filter(({language}) => ["en-us", "en-gb", "en-au","en-ca", "en-za", "en-in", "ru"].some(el => language.includes(el)))

//       const list = {}
//       const formated = final.map(course => {
//         const lang = course.language.includes('ru') ? 'russian' : 'english';
//         const subjects = course.subjects.map(subject => {
//           switch (subject) {
//             case 'Biology & Life Sciences':
//               return 'biology';
//             case 'Data Analysis & Statistics':
//               return 'data_science';
//             case 'Business & Management':
//               return 'business';
//             case 'Economics & Finance':
//               return 'economics';
//             case 'Social Sciences':
//               return 'social_science';
//             case 'Data Analysis & Statistics':
//               return 'data_science';
//             case 'Philosophy & Ethics':
//               return 'philosophy_and_ethics';
//             case 'Computer Science':
//               return 'computer_science';
//             case 'Energy & Earth Sciences':
//               return 'earth_science';
//             case 'Environmental Studies':
//               return 'environmental_studies';
//             case 'Health & Safety':
//               return 'health_and_safety';
//             case 'Education & Teacher Training':
//               return 'education';
//             case 'Art & Culture':
//               return 'art';
//             case 'Food & Nutrition':
//               return 'food_and_nutrition';
//             default:
//               return subject.toLowerCase();
//           }
//         });

//       const genres = [lang, ...subjects, course.level.toLowerCase(), "edx", "video", "online", "free"]
//       const tags = {};
//       if (genres) {
//         genres.forEach(genre => {
//           tags[
//             genre
//               .toLowerCase()
//               .split(' ')
//               .join('_')
//           ] = 3;
//         });
//       }
//         return {
//           name: {
//             us: course.name
//           },
//           description: {
//             us: course.description
//           },
//           img: {
//             us: course.img
//           },
//           video: {
//             us: course.video && "https://www.youtube.com/embed/" + course.video.split("v=")[1]
//           },
//           link: {
//             us:  course.url
//           },
//           genres: genres,
//           tags: tags
//         };
//       });
//       if(!req.body.min || !req.body.max) throw new Error("No min or max")
//       const courses = await Course.insertMany(formated.slice(req.body.min, req.body.max))
//       res.json("courses");
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// @route   PUT api/course/edit/:id
// @desc    Edit course in database
// @access  Private/Moderator
router.put('/edit/:id', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.editItem(req, res, next, 'course');
});

// @route   DELETE api/course/delete/:id
// @desc    Delete course from database
// @access  Private/Moderator
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.deleteItem(req, res, next, 'course');
});

module.exports = router;
