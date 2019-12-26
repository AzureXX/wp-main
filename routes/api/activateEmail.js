const express = require("express");
const ActivationCode = require("../../models/ActivationCode");
const User = require("../../models/User");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let result = await ActivationCode.findOne({ code: req.body.code });
    if (!result) {
      throw new Error("activationCode.notFound");
    }
    // check if 3 days have passed since link was sent
    if (Date.now() - new Date(`${result.date}`).getTime() > 259200000) {
      ActivationCode.deleteOne({ code: req.body.code }).exec();
      throw new Error("activationCode.expired");
    } else {
      await User.updateOne({ _id: result.userID }, { $set: { activated: result.email } });
      ActivationCode.deleteOne({ code: req.body.code }).exec();
      res.json("success");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
