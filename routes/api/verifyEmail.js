const express = require("express");
const EmailVerification = require("../../models/EmailVerification");
const User = require("../../models/User");
const router = express.Router();
const emailVerification = require("../../services/emailVerification");
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
      await User.updateOne({ _id: result.userID }, { $set: { "verified.email": result.email } });
      EmailVerification.deleteOne({ code: req.body.code }).exec();
      res.json("success");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/resend", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const verificationCode = emailVerification(newUser.id, newUser.email);
    res.json({
      verificationLink: `/activation/${verificationCode}`
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;
