const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');
const Message = require("../../models/Message")
//@route   POST api/message/add
//@desc    Adds new message to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, 'message');
  }
);

//@route   PUT api/message/edit/:id
//@desc    Edit message in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, 'message');
  }
);

//@route   DELETE api/message/delete/:id
//@desc     Delete message from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, "message");
  }
);

//@route   GET api/message/get/all/:page
//@desc    Get all message by page
//@access  Public
router.get('/get/all/:page?',  async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'messages', 20);
});

//@route   GET api/message/get/id/:id
//@desc    Get message by id
//@access  Public
router.get('/get/id/:id',  async (req, res, next) => {
  await requests.getItem(req, res, next, 'messages');
});

//@route   GET api/message/get/current
//@desc    Get messages for current user
//@access  Public
router.get("/get/current", passport.authenticate('jwt', { session: false }), async (req,res,next) => {
  try {
    const messages = await Message.find({$or : [{all: true}, {to: req.user._id}]}).lean()
    return res.json(messages)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
