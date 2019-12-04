const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const validator = require("../../validation/validators/auth");

//@route   POST api/auth/signup
//@desc    Return JWT
//@access  Public
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password, type } = req.body;
    
    // joi validation of request body
    validator.signUp(req.body);

    let exist = await User.findOne(
      {
        email: req.body.email
      },
      "_id"
    ).lean();

    if (exist) throw new Error("email.exist");
    if (username) {
      exist = await User.findOne(
        {
          username: username
        },
        "_id"
      ).lean();
      if (exist) throw new Error("user.exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({
      username: username,
      email: email,
      password: hash,
      accountType: type
    });
    const newUser = await user.save();
    const payload = {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role
    };

    const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
      expiresIn: 360000
    });
    return res.json({
      success: true,
      token: "Bearer " + token
    });
  } catch (error) {
    next(error);
  }
});

//@route   POST api/auth/signin
//@desc    Return JWT
//@access  Public
router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // joi validation of request body
    validator.signIn(req.body);

    const user = await User.findOne(
      {
        email
      },
      "+password username role"
    ).lean();

    if (!user) throw new Error("user.notfound");
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user._id,
        username: user.username,
        role: user.role
      };
      const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: 360000
      });
      return res.json({
        success: true,
        token: "Bearer " + token
      });
    } else {
      throw new Error("password.invalid");
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
