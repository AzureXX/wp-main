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
      RecommendationModel.updateOne(
        { userId: req.user.id },
        { $pull: { [type]: { data: id } } }
      ).exec();

      const singular = transformation.getSingular(type);

      if (status === 2) {
        await RatingModel.deleteOne({
          userId: req.user.id,
          [singular]: id
        });
      } else {
        if (rating) status = 0;
        else if (status) rating = 0;
        await RatingModel.updateOne(
          { userId: req.user.id, [singular]: id },
          {
            userId: req.user.id,
            [singular]: id,
            rating: parseInt(rating),
            status: parseInt(status)
          },
          { upsert: true }
        );
      }
      const response = await RatingModel.find({userId: req.user.id})
      res.json(response)
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
);
module.exports = router;
