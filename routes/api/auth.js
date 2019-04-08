const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

//@route   POST api/auth/signup
//@desc    Return JWT
//@access  Public
router.post('/signup', async(req, res, next) => {
    const { handler, email, password, password2, firstName, lastName } = req.body;

    try {
        if (!password) throw new Error('Password is required');
        if (!email) throw new Error('Email is required');
        if (password != password2) throw new Error("Passwords do not match")

        let user = await User.findOne({ email: req.body.email });

        if (user) throw new Error('Email already exists');
        if (handler) {
            user = await User.findOne({ handler: handler });
            if (user) throw new Error('Handler already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user = new User({
            handler: handler,
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName
        });
        const newUser = await user.save();
        const payload = {
            id: newUser._id,
            handler: newUser.handler,
            role: newUser.role
        };
        const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
            expiresIn: 360000
        });
        res.json({ success: true, token: 'Bearer ' + token });
    } catch (error) {
        return next(error);
    }
});

//@route   POST api/auth/signin
//@desc    Return JWT
//@access  Public
router.post('/signin', async(req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!password) throw new Error('Password is required');
        if (!email) throw new Error('Email is required');

        const user = await User.findOne({ email });
        if (!user) throw new Error('User Not Found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = {
                id: user._id,
                handler: user.handler,
                role: user.role
            };
            const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
                expiresIn: 360000
            });
            res.json({ success: true, token: 'Bearer ' + token });
        } else {
            throw new Error('Password is incorrect');
        }
    } catch (error) {
        return next(error);
    }
});

module.exports = router;