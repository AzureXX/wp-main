const validation = require('./validation');
const transformation = require('./transformation');

module.exports = {
  async setRating(req, res, next, model, item) {
    try {
      let { rating, status, id } = req.body;
      if (rating) status = 0;
      else if (status) rating = 0;
      const dollarStr = item + '.$';
      const idStr = item + '.id';
      //gets current ratings of user
      const ratings = await model.findOne({ userId: req.user.id, [idStr]: id });
      let response;
      if (!ratings) {
        // if item is not rated by this user yet
        response = await model
          .findOneAndUpdate(
            { userId: req.user.id },
            {
              userId: req.user.id,
              $push: {
                [item]: { id, rating, status }
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
  },
  //Get array of items from DB by page
  async getAllItems(req, res, next, model, name, rating, size) {
    try {
      const populate = req.query.populate ? req.query.populate : '';
      const select = req.query.select ? req.query.select : '';
      const only = req.query.only ? req.query.only : '';

      const offset = transformation.getOffset(req.params.page, size);
      let items = await model
        .find({}, only)
        .skip(offset)
        .limit(size)
        .populate({
          path: populate,
          select: select,
          populate: { path: 'categories subcategories topics subtopics courses' }
        });

      res.json({
        lastPage: items.length < size,
        [name]: items
      });
    } catch (error) {
      next(error);
    }
  },
  async getItem(req, res, next, model, name, rating) {
    try {
      const id = transformation.mongooseId(req.params.id);
      const populate = req.query.populate ? req.query.populate : '';
      const select = req.query.select ? req.query.select : '';

      const item = await model.findById(id).populate({
        path: populate,
        select: select,
        populate: { path: 'categories subcategories topics subtopics' }
      });
      if (!item) throw new Error(`No such ${name} exist`);
      
      
      res.json(item);
    } catch (error) {
      next(error);
    }
  },
  async deleteItem(req, res, next, model, check) {
    try {
      if (!validation.mongooseId(req.params.id))
        throw new Error('ID is not valid');
      if (check) {
        const item = await model.findById(req.params.id);
        if (item.creator.toString() !== req.user.id)
          throw new Error('Not authorized');
      }
      await model.findByIdAndDelete(req.params.id);
      res.json('Success');
    } catch (error) {
      next(error);
    }
  },
  async editItem(req, res, next, model, name, check) {
    try {
      const id = transformation.mongooseId(req.params.id);
      const item = await model.findById(id);
      if (!item) throw new Error(`No such ${name} exist`);
      console.log(item);
      if (check) {
        if (item.creator.toString() !== req.user.id)
          throw new Error('Not authorized');
      }
      const saved = await model.findByIdAndUpdate(
        id,
        transformation.getObject(req, name)
      );
      res.status(200).json(saved);
    } catch (error) {
      next(error);
    }
  },
  async createItem(req, res, next, model, name) {
    try {
      const newItem = new model(transformation.getObject(req, name));
      const item = await newItem.save();
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  },
  async getUserRatingList(req, res, next, type) {
    try {
      const Model = transformation.getRatingModel(type);
      const ratings = await Model.findOne({ userId: req.params.id }).populate({
        path: !req.query.populate ? type + '.id' : '',
        select: 'name'
      });
      res.json(ratings);
    } catch (error) {
      next(error);
    }
  },
  async getUserRatingListAll(req, res, next) {
    try {
      const BookRating = transformation.getRatingModel('books');
      const MovieRating = transformation.getRatingModel('movies');
      const CourseRating = transformation.getRatingModel('courses');

      let bookRating = BookRating.findOne({ userId: req.params.id }).populate({
        path: !req.query.populate ? 'books' + '.id' : '',
        select: 'name'
      });
      
      let movieRating = MovieRating.findOne({
        userId: req.params.id
      }).populate({
        path: !req.query.populate ? 'movies' + '.id' : '',
        select: 'name'
      });
      let courseRating = CourseRating.findOne({
        userId: req.params.id
      }).populate({
        path: !req.query.populate ? 'courses' + '.id' : '',
        select: 'name'
      });
      bookRating = await bookRating;
      movieRating = await movieRating;
      courseRating = await courseRating;
      res.json({
        books: bookRating ? bookRating.books : [],
        movies: movieRating? movieRating.movies : [],
        courses: courseRating? courseRating.courses : []
      });
    } catch (error) {
      next(error);
    }
  },
  async updateItemRecommendations(req, res, next, name) {
    try {
      const itemRatingModel = transformation.getRatingModel(name);
      const itemModel = transformation.getModel(name);
      const itemRecommendationModel = transformation.getRecommendationModel(
        name
      );
      const plural = transformation.getPlural(name);

      const ratings = await itemRatingModel.findOne({ userId: req.user._id });
      let rated = [];
      if (ratings) {
        rated = ratings[plural].map(item => item.id);
      }

      const items = await itemModel.find({ _id: { $nin: rated } });
      const pointedItems = items.map(item => ({
        data: item._id,
        points: Math.floor(Math.random() * 10000)
      }));
      pointedItems.sort((a, b) => b.points - a.points);
      const toSave = { userId: req.user._id, [plural]: pointedItems };
      const recs = await itemRecommendationModel
        .findOneAndUpdate({ userId: req.user.id }, toSave, {
          upsert: true,
          returnOriginal: false,
          new: true
        })
        .populate(plural + '.data');
      res.json(recs);
    } catch (error) {
      next(error);
    }
  },
  async getItemRecommendations(req, res, next, name) {
    try {
      const itemRecommendationModel = transformation.getRecommendationModel(
        name
      );
      const plural = transformation.getPlural(name);

      const recs = await itemRecommendationModel
        .findOne({ userId: req.user.id })
        .populate(plural + '.data');
      res.json(recs);
    } catch (error) {
      next(error);
    }
  }
};
