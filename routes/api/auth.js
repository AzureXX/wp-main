const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

router.post("/signup", async (req, res, next) => {
  const { handler, email, password } = req.body;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) next(new Error("Email already exists"));
    else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user = new User({
        handler: handler,
        email: email,
        password: hash
      });
      newUser = await user.save();
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) next(new Error("User Not Found"));
    else {
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
        next(new Error("Password is incorrect"));
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
