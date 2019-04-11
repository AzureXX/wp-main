const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
//@route   GET api/user/current
//@desc    Return current user's email and id
//@access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            res.json({
                email: req.user.email,
                username: req.user.username,
                id: req.user.id,
                role: req.user.role,
                type: req.user.accountType,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                description: req.user.description,
                country: req.user.country,
                city: req.user.city,
                dob: req.user.dob,
                phoneNumber: req.user.phoneNumber
            });
        } catch (error) {
            return next(error);
        }
    }
);

//@route   GET api/user/get/:username
//@desc    Return user by username or id
//@access  Public
router.get('/get/:username', async(req, res, next) => {
    try {
        const objId = new ObjectId(
            ObjectId.isValid(req.params.username) ?
            req.params.username :
            '123456789012'
        );
        const user = await User.findOne({
            $or: [{ username: req.params.username }, { _id: objId }]
        });

        if (!user) throw new Error('No user found');
        res.json({
            email: user.email,
            username: user.username,
            id: user.id,
            role: user.role,
            type: user.accountType,
            firstname: user.firstname,
            lastname: user.lastname,
            description: user.description,
            country: user.country,
            city: user.city,
            dob: user.dob,
            phoneNumber: user.phoneNumber
        });
    } catch (error) {
        return next(error);
    }
});
//@route   put api/user/update
//@desc    Return user by username or id
//@access  Private
router.put(
    '/update',
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            let user;
            if (req.body.username && req.user.username !== req.body.username) {
                user = await User.findOne({ username: req.body.username });
                if (user) throw new Error('Username already exist');
            }
            if (req.body.email && req.user.email !== req.body.email) {
                user = await User.findOne({ email: req.body.email });
                if (user) throw new Error('Email already exist');
            }

            user = await User.findOneAndUpdate({ _id: req.user.id }, {
                username: req.body.username || req.user.username,
                email: req.body.email || req.user.email,
                firstname: req.body.firstname ?
                    req.body.firstname :
                    req.body.firstname === '' ?
                    req.body.firstname :
                    req.user.firstname,
                lastname: req.body.lastname ?
                    req.body.lastname :
                    req.body.lastname === '' ?
                    req.body.lastname :
                    req.user.lastname,
                city: req.body.city ?
                    req.body.city :
                    req.body.city === '' ?
                    req.body.city :
                    req.user.city,
                country: req.body.country ?
                    req.body.country :
                    req.body.country === '' ?
                    req.body.country :
                    req.user.country,
                description: req.body.description ?
                    req.body.description :
                    req.body.description === '' ?
                    req.body.description :
                    req.user.description,
                dob: req.body.dob ?
                    req.body.dob :
                    req.body.dob === '' ?
                    null :
                    req.user.dob,
                phoneNumber: req.body.phoneNumber ?
                    req.body.phoneNumber :
                    req.body.phoneNumber === '' ?
                    req.body.phoneNumber :
                    req.user.phoneNumber
            });
            return res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    }
);
//@route   put api/user/changepass
//@desc    Changes user password
//@access  Private
router.put(
    '/changepass',
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            const { password, newPassword, newPassword2 } = req.body;
            const isMatch = await bcrypt.compare(password, req.user.password);
            if (isMatch) {
                if (newPassword !== newPassword2)
                    throw new Error('Passwords do not match');
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newPassword, salt);
                await User.findByIdAndUpdate(req.user.id, { password: hash });
                res.json('Password was succesfully changed');
            } else {
                throw new Error('Old password is incorrect');
            }
        } catch (error) {
            next(error);
        }
    }
);

//@route   put api/user/delete
//@desc    Deletes User
//@access  Private
router.delete(
    '/delete',
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            const { password } = req.body;
            const isMatch = await bcrypt.compare(password, req.user.password);
            if (isMatch) {
                await User.findOneAndDelete({ _id: req.user.id });
                return res.status(200).send('Successully deleted');
            } else {
                throw new Error('Password is incorrect');
            }
        } catch (error) {
            return next(error);
        }
    }
);
module.exports = router;