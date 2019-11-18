const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Vacancy = require('../../models/Vacancy');

const requests = require('../../utils/requests');
//@route   POST api/vacancy/add
//@desc    Adds new vacancy to database
//@access  Private/Business
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isBusiness,
  async (req, res, next) => {
    await requests.createItem(req, res, next, 'vacancy');
  }
);

//@route   PUT api/vacancy/edit/:id
//@desc    Edit vacancy in database
//@access  Private/Business
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isBusiness,
  async (req, res, next) => {
    await requests.editItem(req, res, next, 'vacancy', true);
  }
);

//@route   DELETE api/vacancy/delete/:id
//@desc     Delete vacancy from database
//@access  Private/Business
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isBusiness,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, "vacancy", true);
  }
);

//@route   GET api/vacancy/get/all/:page
//@desc    Get all vacancies by page
//@access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'vacancies', 20);
});

//@route   GET api/vacancy/get/current
//@desc    Get all vacancies of that user
//@access  Private
router.get(
  '/get/current',
  passport.authenticate('jwt', { session: false }),
  roles.isBusiness,
  async (req, res, next) => {
    try {
      const response = await Vacancy.find({ creator: req.user._id }).lean();
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

//@route   GET api/vacancy/get/id/:id
//@desc    Get vacancy by id
//@access  Public
router.get('/get/id/:id', async (req, res, next) => {
  await requests.getItem(req, res, next, 'vacancies');
});

module.exports = router;
