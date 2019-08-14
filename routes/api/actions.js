const express = require('express');
const router = express.Router();
const passport = require('passport');
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
        throw new Error('Invalid type');
      let { rating, status, id } = req.body;
      const RecommendationModel = transformation.getRecommendationModel(type);
      const RatingModel = transformation.getRatingModel(type);
      
      const singular = transformation.getSingular(type);
      if ((status !== 2 && status) || rating) {
        RecommendationModel.updateOne(
          { userId: req.user.id },
          { $pull: { [type]: { data: id } } }
        ).exec();
      }
      if (status === 2) {
        await RatingModel.deleteOne({
          userId: req.user.id,
          [singular]: id
        });
      } else {
        if (rating) status = 0;
        else if (status) rating = 0;
        if(status == 0 && !rating) {
          await RatingModel.updateOne(
            { userId: req.user.id, [singular]: id },
            {
              userId: req.user.id,
              [singular]: id,
              status: parseInt(status, 10)
            },
            { upsert: true }
          );
        } else {
          await RatingModel.updateOne(
            { userId: req.user.id, [singular]: id },
            {
              userId: req.user.id,
              [singular]: id,
              rating: parseInt(rating, 10),
              status: parseInt(status, 10)
            },
            { upsert: true }
          );
        }
        
      }
      const response = await RatingModel.find({userId: req.user.id}).populate({path: singular, select:"name"})
      res.json(response)
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
