const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../../utils/models');
const requests = require('../../utils/requests');
const axios = require("axios");
const transformation = require('../../utils/transformation');

//@route   POST api/actions/rate/:type
//@desc    Rates content
//@access  Private
router.post(
  '/rate/:type',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const types = ['books', 'movies', 'courses', 'people', 'music'];
      const { type } = req.params;
      if (!types.includes(type)) 
        throw new Error('type.invalid');
      let { rating, status, id } = req.body;

      const RatingModel = models.getRatingModel(type);
      
      const singular = transformation.getSingular(type);
      if ((status !== 2 && status) || rating) {
        axios.patch(
          process.env.RECOMMENDATION_LINK + 'update/remove',
          {user: req.user._id, type: type, id: id},
          {
            headers: {
              Authorization: process.env.RECOMMENDATION_ACCESS_TOKEN
            }
          }
        ).catch((err)=> console.log(err.response.data))
      }
      if (status === 2) {
        await RatingModel.deleteOne({
          userId: req.user._id,
          [singular]: id
        });
      } else {
        if (rating) status = 0;
        else if (status) rating = 0;
        if(status == 0 && !rating) {
          await RatingModel.updateOne(
            { userId: req.user._id, [singular]: id },
            {
              userId: req.user._id,
              [singular]: id,
              status: parseInt(status, 10)
            },
            { upsert: true }
          );
        } else {
          await RatingModel.updateOne(
            { userId: req.user._id, [singular]: id },
            {
              userId: req.user._id,
              [singular]: id,
              rating: parseInt(rating, 10),
              status: parseInt(status, 10)
            },
            { upsert: true }
          );
        }
        
      }
      if (rating) {
        requests.createUserLog(req,res,next, type, id, rating, "rating")
      } else if(status || status === 0) {
        requests.createUserLog(req,res,next, type, id, status, "status")
      }
        
      requests.checkAchievement(req, res, next, type);
      const response = await RatingModel.find({userId: req.user._id}).populate({path: singular, select:"name"}).lean()
      return res.json(response)
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
