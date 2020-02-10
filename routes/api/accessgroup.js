const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require('../../utils/requests');
// model
const AccessGroup = require("../../models/AccessGroup");

//@route   POST api/accessgroup/add
//@desc    Adds new access group to database
//@access  Private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.createItem(req, res, next, 'accessgroup');
  }
);

//@route   PUT api/accessgroup/edit/:id
//@desc    Edit access group in database
//@access  Private
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.editItem(req, res, next, 'accessgroup', true);
  }
);

//@route   DELETE api/accessgroup/delete/:id
//@desc     Delete accessgroup from database
//@access  Private
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, "accessgroup", true);
  }
);

//@route   GET api/accessgroup/get/current
//@desc    Get all access groups of that user
//@access  Private
router.get(
  '/get/current',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const response = await AccessGroup.find({ creator: req.user._id }).lean();
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

//@route   GET api/accessgroup/get/id/:id
//@desc    Get  access group of that user by id
//@access  Private
router.get(
  '/get/id/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const response = await AccessGroup.findOne({ creator: req.user._id, _id: req.params.id }).populate({
        path: "users",
        select: "username"
      }).lean();
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
