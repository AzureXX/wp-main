const validation = require('./validation');
const transformation = require('./transformation');

module.exports = {
  //Get array of items from DB by page
  async getAllItems(req, res, next, name, size) {
    try {
      const model = transformation.getModel(name);
      const populate = req.query.populate ? req.query.populate : '';
      const select = req.query.select ? req.query.select : '';
      const only = req.query.only ? req.query.only : '';
      const filter = {};
      console.log(req.query.filter);
      if (req.query.filter) {
        filterJSON = JSON.parse(req.query.filter);

        filterJSON.genres && filterJSON.genres.length > 0
          ? (filter.genres = { $all: filterJSON.genres })
          : null;

        filterJSON.published &&
        filterJSON.published.start != null &&
        filterJSON.published.end != null
          ? (filter.published = {
              $gte: new Date(filterJSON.published.start, 0, 1),
              $lt: new Date(filterJSON.published.end + 1, 0, 1)
            })
          : null;

        filterJSON.released &&
        filterJSON.released.start != null &&
        filterJSON.released.end != null
          ? (filter.released = {
              $gte: new Date(filterJSON.released.start, 0, 1),
              $lt: new Date(filterJSON.released.end + 1, 0, 1)
            })
          : null;
      }

      console.log(filter);
      const offset = transformation.getOffset(req.params.page, size);
      let items = await model
        .find(filter, only)
        .skip(offset)
        .limit(size)
        .populate({
          path: populate,
          select: select,
          populate: {
            path: 'categories subcategories topics subtopics courses'
          }
        });

      res.json({
        lastPage: items.length < size,
        [name]: items
      });
    } catch (error) {
      next(error);
    }
  },
  async getItem(req, res, next, name) {
    try {
      //const access = await this.getUserAccess(req,res,next,req.user.id);
      //await transformation.getAccessOptions("5c70f92aaf6ed806320334f5")

      const model = transformation.getModel(name);
      const id = transformation.mongooseId(req.params.id);
      const populate = req.query.populate ? req.query.populate : '';
      const select = req.query.select ? req.query.select : '';
      const deep =
        req.query.deeppopulate ||
        'categories subcategories topics subtopics courses';
      console.log('populate', populate);
      const item = await model.findById(id).populate({
        path: populate,
        select: select,
        populate: { path: deep }
      });
      if (!item) throw new Error(`No such ${name} exist`);

      res.json(item);
    } catch (error) {
      next(error);
    }
  },
  async deleteItem(req, res, next, name, check) {
    try {
      const model = transformation.getModel(name);
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
  async editItem(req, res, next, name, check) {
    try {
      const Model = transformation.getModel(name);
      const id = transformation.mongooseId(req.params.id);
      const item = await Model.findById(id);
      if (!item) throw new Error(`No such ${name} exist`);
      if (check) {
        if (item.creator.toString() !== req.user.id)
          throw new Error('Not authorized');
      }
      const saved = await Model.findByIdAndUpdate(
        id,
        transformation.getObject(req, name)
      );
      res.status(200).json(saved);
    } catch (error) {
      next(error);
    }
  },
  async createItem(req, res, next, name) {
    try {
      const Model = transformation.getModel(name);
      const newItem = new Model(transformation.getObject(req, name));
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
      const MusicRating = transformation.getRatingModel('music');

      let bookRating = BookRating.find({ userId: req.params.id }).populate({path: "book", select:"name"});
      let movieRating = MovieRating.find({ userId: req.params.id }).populate({path: "movie", select:"name"});
      let musicRating = MusicRating.find({ userId: req.params.id }).populate({path: "music", select:"name"});
      let courseRating = CourseRating.find({ userId: req.params.id }).populate({path: "course", select:"name"});

      bookRating = await bookRating;
      movieRating = await movieRating;
      musicRating = await musicRating;
      courseRating = await courseRating;

      res.json({
        books: bookRating,
        movies: movieRating ,
        courses: courseRating,
        music: musicRating
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
  },
  async setEducationStatus(req, res, next, type) {
    try {
      const EducationStatusModel = transformation.getEducationStatusModel(type);
      const status = await EducationStatusModel.updateOne(
        { userId: req.user.id, [type]: req.body.id },
        {
          userId: req.user.id,
          [type]: req.body.id,
          status: parseInt(req.body.status)
        },
        { upsert: true }
      );
      res.json('success');
    } catch (error) {
      next(error);
    }
  },
  async getUserEducationStatus(req, res, next, type) {
    try {
      const EducationStatusModel = transformation.getEducationStatusModel(type);
      const statuses = await EducationStatusModel.find({
        userId: req.params.id
      });
      res.json(statuses);
    } catch (error) {
      next(error);
    }
  },
  async getUserEducationStatusAll(req, res, next) {
    try {
      const Subcategory = transformation.getEducationStatusModel('subcategory');
      const Topic = transformation.getEducationStatusModel('topic');
      const Subtopic = transformation.getEducationStatusModel('subtopic');
      let subcategories = Subcategory.find(
        { userId: req.params.id },
        '-_id -__v'
      );
      let topics = Topic.find({ userId: req.params.id }, '-_id -__v');
      let subtopics = Subtopic.find({ userId: req.params.id }, '-_id -__v');
      subcategories = await subcategories;
      topics = await topics;
      subtopics = await subtopics;

      res.json({ subcategories, topics, subtopics });
    } catch (error) {
      next(error);
    }
  },
  async getUserAccess(req, res, next, user) {
    try {
      const User = transformation.getModel('user');
      const AccessModel = transformation.getModel('accessgroup');
      const userData = User.findById(user);
      const accessGroups = AccessModel.find({
        creator: user,
        users: { $in: req.user._id }
      });
      console.log(req.user.id);
      console.log(accessGroups);
    } catch (error) {
      next(error);
    }
  },
  async createTask(req, res, next) {
    try {
      const Task = transformation.getModel('task');
      const newTask = new Task(transformation.getObject(req, 'task'));
      const task = await newTask.save();
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  },
  async getMyTasks(req, res, next) {
    try {
      const Task = transformation.getModel('task');
      const tasks = await Task.find({ creator: req.user.id }).populate(
        'user item',
        'name username'
      );
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },
  async getTasksForMe(req, res, next) {
    try {
      const Task = transformation.getModel('task');
      const tasks = await Task.find({ user: req.user.id }).populate(
        'creator item',
        'name username'
      );
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },
  async updateTaskStatus(req, res, next) {
    try {
      const Task = transformation.getModel('task');
      const task = await Task.findById(req.params.id);

      if (!task) {
        throw new Error('No such task');
      } else if (
        task.creator.toString() == req.user.id.toString() ||
        task.user.toString() == req.user.id.toString()
      ) {
        Task.updateOne(
          { _id: req.params.id },
          { status: req.body.status || task.status }
        ).exec();
      } else {
        throw new Error('Not authorized');
      }
      res.json('success');
    } catch (error) {
      next(error);
    }
  },
  async updateTaskArchive(req, res, next) {
    try {
      const Task = transformation.getModel('task');
      const task = await Task.findById(req.params.id);
      if (!task) {
        throw new Error('No such task');
      } else if (
        task.creator.toString() == req.user.id.toString() ||
        task.user.toString() == req.user.id.toString()
      ) {
        Task.updateOne(
          { _id: req.params.id },
          { archived: req.body.archived || task.archived }
        ).exec();
      } else {
        throw new Error('Not authorized');
      }
      res.json('success');
    } catch (error) {
      next(error);
    }
  }
};
