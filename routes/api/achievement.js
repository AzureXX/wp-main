const express = require("express");
const passport = require("passport");

const requests = require("../../utils/requests");
const roles = require("../../utils/roles");
const Achievement = require("../../models/Achievement");

const router = express.Router();

//@route   GEt api/achievements/get/all
//@desc    Get all achievements from database
//@access  Public
router.get("/get/all", async (req, res, next) => {
  try {
    const achievements = await Achievement.find({}).sort("order").lean();
    res.json(achievements);
  } catch (error) {
    next(error);
  }
});

//@route   GEt api/achievements/get/id/:id
//@desc    Get achievement by id from database
//@access  Public
router.get("/get/id/:id", async (req, res, next) => {
  await requests.getItem(req, res, next, "achievement");
});

//@route   POST api/achievements/add
//@desc    add new achievement
//@access  admin & moderator
router.post("/add", passport.authenticate("jwt", { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.createItem(req, res, next, "achievement");
});

//@route   PUT api/achievements/edit
//@desc    edit selected achievement
//@access  admin & moderator
router.put("/edit", passport.authenticate("jwt", { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.createItem(req, res, next, "achievement");
});

//@route   PUT api/achievements/delete
//@desc    delete selected achievement
//@access  admin ? moderator
router.put("/delete", passport.authenticate("jwt", { session: false }), roles.isModerator, async (req, res, next) => {
  await requests.deleteItem(req, res, next, "achievement", false);
});

module.exports = router;
