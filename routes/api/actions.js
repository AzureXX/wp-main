const express = require('express');
const router = express.Router();
const passport = require('passport');
const transformation = require("../../utils/transformation")

//@route   POST api/actions/rate/:type
//@desc    Rates content
//@access  Private
router.post(
  '/rate/:type',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const types = [
        'books',
        'movies',
        'courses',
        'people',
        "music"
      ];
      const { type } = req.params;
      if (!types.includes(type))
        throw new Error('Invalid type');
      
      let { rating, status, id } = req.body;
      const recModel = transformation.getRecommendationModel(type);
      const model = transformation.getRatingModel(type);
      recModel
        .updateOne({ userId: req.user.id }, { $pull: { [type]: { data: id } } })
        .exec();

      const dollarStr = type + '.$';
      const idStr = type + '.id';

      const ratings = await model.findOne({ userId: req.user.id, [idStr]: id });

      if (status === 2 && ratings) {
        const response = await model
          .findOneAndUpdate(
            { userId: req.user.id, [idStr]: id },
            {
              $pull: {
                [type]: { id }
              }
            },
            { upsert: true, returnOriginal: false, new: true }
          )
          .populate({
            path: idStr,
            select: 'name'
          });
        console.log(response);
        return res.json(response);
      }

      if (rating) status = 0;
      else if (status) rating = 0;

      //gets current ratings of user

      let response;
      if (!ratings) {
        // if item is not rated by this user yet
        response = await model
          .findOneAndUpdate(
            { userId: req.user.id },
            {
              userId: req.user.id,
              $push: {
                [type]: { id, rating, status }
              }
            },
            { upsert: true, returnOriginal: false, new: true }
          )
          .populate({
            path: idStr,
            select: 'name'
          });
      } else {
        // if item already rated by this user
        response = await model
          .findOneAndUpdate(
            { userId: req.user.id, [idStr]: id },
            {
              $set: {
                [dollarStr]: { id, rating, status }
              }
            },
            { upsert: true, returnOriginal: false, new: true }
          )
          .populate({
            path: idStr,
            select: 'name'
          });
      }

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
