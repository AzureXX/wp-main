const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//@route   POST api/auth/signup
//@desc    Return JWT
//@access  Public
router.post("/signup", async (req, res, next) => {
  const { handler, email, password } = req.body;
  if( !password ) return next(new Error("Password is required"));
  if( !email ) return next(new Error("Email is required"));
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return next(new Error("Email already exists"));
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user = new User({
        handler: handler,
        email: email,
        password: hash
      });
      newUser = await user.save();
      const payload = {
        id: newUser._id,
        handler: newUser.handler,
        role: newUser.role
      };
      const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: 3600
      });
      res.json({ success: true, token: "Bearer " + token });
  } catch (error) {
    return next(error);
  }
});


//@route   POST api/auth/signin
//@desc    Return JWT
//@access  Public
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  if( !password ) return next(new Error("Password is required"));
  if( !email ) return next(new Error("Email is required"));
  try {
    const user = await User.findOne({ email });
    if (!user) return next(new Error("User Not Found"));
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      //User Matched
      const payload = {
        id: user._id,
        handler: user.handler,
        role: user.role
      };
      const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: 3600
      });
      res.json({ success: true, token: "Bearer " + token });
    } else {
      return next(new Error("Password is incorrect"));
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
