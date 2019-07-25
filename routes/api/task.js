const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require("../../utils/requests.js")



//@route   POST api/task/add
//@desc    Adds new task
//@access  Private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.createTask(req,res,next)
  }
);

module.exports = router;