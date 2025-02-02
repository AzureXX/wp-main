const express = require("express");
const EmailVerification = require("../../models/EmailVerification");
const User = require("../../models/User");
const router = express.Router();
const verifyEmail = require("../../services/verifyEmail");
const passport = require("passport");

router.post("/", async (req, res, next) => {
  try {
    let result = await EmailVerification.findOne({ code: req.body.code });
    if (!result) {
      throw new Error("emailVerification.notFound");
    }
    // check if 3 days have passed since link was sent
    if (Date.now() - new Date(`${result.date}`).getTime() > 259200000) {
      EmailVerification.deleteOne({ code: req.body.code }).exec();
      throw new Error("emailVerification.expired");
    } else {
      await User.updateOne({ _id: result.userId }, { $set: { "verified.email": result.email } });
      EmailVerification.deleteOne({ code: req.body.code }).exec();
      res.json("success");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/resend", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const sent = await EmailVerification.find({userId: req.user._id}, "date").lean();
    sent.forEach(obj => {
      console.log(Date.now() - new Date(`${obj.date}`).getTime())
      if(Date.now() - new Date(`${obj.date}`).getTime() < 900000) throw new Error("email.alreadysent")
    })
    verifyEmail(req.user._id, req.user.email);
    res.json("success")
  } catch (error) {
    next(error);
  }
});

module.exports = router;
