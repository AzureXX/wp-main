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

//@route   GET api/task/my
//@desc    Get my tasks
//@access  Private
router.get(
  '/my',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.getMyTasks(req,res,next)
  }
);

//@route   GET api/task/forme
//@desc    Get tasks for me
//@access  Private
router.get(
  '/forme',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.getTasksForMe(req,res,next)
  }
);

//@route   PUT api/task/status/:id
//@desc    Update task status
//@access  Private
router.put(
  '/status/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.updateTaskStatus(req,res,next)
  }
);

//@route   PUT api/task/archive/:id
//@desc    Update task archive status
//@access  Private
router.put(
  '/archived/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.updateTaskArchive(req,res,next)
  }
);

//@route   PUT api/task/delete/:id
//@desc    Update task archive status
//@access  Private
router.put(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.deleteTask(req,res,next)
  }
);
module.exports = router;