const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Person = require('../../models/Person');
const transformation = require('../../utils/transformation');
const validation = require('../../utils/validation');

//@route   POST api/person/add
//@desc    Adds new person to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      const newPerson = new Person(transformation.getPersonObject(req.body), {
        new: true
      });
      const person = await newPerson.save();
      res.status(200).json(person);
    } catch (error) {
      next(error);
    }
  }
);

//@route   PUT api/person/edit/:id
//@desc    Edit person in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      const id = transformation.mongooseId(req.params.id);
      const person = await Person.findById(id);
      if (!person) throw new Error('No such person exist');
      const saved = await Person.findByIdAndUpdate(
        id,
        transformation.getPersonObject(req.body)
      );
      res.status(200).json(saved);
    } catch (error) {
      next(error);
    }
  }
);

//@route   Delete api/person/delete
//@desc     Delete person from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    try {
      if (!validation.mongooseId(req.params.id))
        throw new Error('ID is not valid');
      await Person.findByIdAndDelete(req.params.id);
      res.json('Success');
    } catch (error) {
      next(error);
    }
  }
);

//@route   GET api/person/get/all/:page
//@desc    Get all people by page
//@access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  try {
    let page = parseInt(req.params.page);
    const size = 100;
    if (isNaN(page)) page = 1;
    const offset = (page - 1) * size;
    const people = await Person.find()
      .skip(offset)
      .limit(size);
    if (people.length == 0) throw new Error('No such page');
    if (people.length < size) res.json({ lastPage: true, people });
    res.json({ lastPage: false, people });
  } catch (error) {
    next(error);
  }
});

//@route   GET api/person/get/id/:id
//@desc    Get person by id
//@access  Public
router.get('/get/id/:id', async (req, res, next) => {
  try {
    const id = transformation.mongooseId(req.params.id);
    const person = await Person.findById(id);
    if (!person) throw new Error('No such person exist');

    res.json(person);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
