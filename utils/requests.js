const validation = require('./validation');
const models = require('./models');
const transformation = require('./transformation');
const axios = require('axios');

module.exports = {
  /*****************
    CRUD FOR ITEMS
  *****************/
  async getAllItems(req, res, next, name, size) {
    try {
      const model = models.getModel(name);
      const populate = req.query.populate ? req.query.populate : '';
      let select = req.query.select ? req.query.select : '';
      if (select.match(/password/i)) select = '_id';
      const only = req.query.only ? req.query.only : '';
      const filter = {};
      if (req.query.filter) {
        filterJSON = JSON.parse(req.query.filter);

        filterJSON.genres && filterJSON.genres.length > 0
          ? (filter.genres = {
              $all: filterJSON.genres
            })
          : null;

        filterJSON.published && filterJSON.published.start != null && filterJSON.published.end != null
          ? (filter.published = {
              $gte: new Date(filterJSON.published.start, 0, 1),
              $lt: new Date(filterJSON.published.end + 1, 0, 1)
            })
          : null;

        filterJSON.released && filterJSON.released.start != null && filterJSON.released.end != null
          ? (filter.released = {
              $gte: new Date(filterJSON.released.start, 0, 1),
              $lt: new Date(filterJSON.released.end + 1, 0, 1)
            })
          : null;

        filterJSON.category && filterJSON.category != 'all' ? (filter.category = filterJSON.category) : null;

        filterJSON.city && filterJSON.city != 'all' ? (filter.city = filterJSON.city) : null;
      }
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
        })
        .sort('-released -published')
        .lean();

      return res.json({
        lastPage: items.length < size,
        [name]: items
      });
    } catch (error) {
      next(error);
    }
  },
  async getItem(req, res, next, name) {
    try {
      const model = models.getModel(name);
      const id = transformation.mongooseId(req.params.id);
      const populate = req.query.populate ? req.query.populate : '';
      let select = req.query.select ? req.query.select : '';
      if (select.match(/password/i)) select = '_id';
      const deep = req.query.deeppopulate || 'categories subcategories topics subtopics courses';
      const item = await model.findById(id).populate({
        path: populate,
        select: select,
        populate: {
          path: deep
        }
      });
      if (!item) throw new Error(`item.notfound`);

      return res.json(item);
    } catch (error) {
      next(error);
    }
  },
  async deleteItem(req, res, next, name, check) {
    try {
      const model = models.getModel(name);
      if (!validation.mongooseId(req.params.id)) throw new Error('id.invalid');
      if (check && req.user.role !== 'admin') {
        const item = await model.findById(req.params.id);
        if (item.creator.toString() !== req.user._id) throw new Error('auth.false');
      }
      if (['book', 'movie', 'course', 'person', 'music'].includes(name)) {
        const Rating = models.getRatingModel(name);
        Rating.deleteMany({
          [name]: req.params.id
        }).exec();
      }
      if (['category', 'subcategory', 'topic', 'subtopic'].includes(name)) {
        const Status = models.getEducationStatusModel(name);
        Status.deleteMany({
          [name]: req.params.id
        }).exec();
      }
      await model.findByIdAndDelete(req.params.id);
      return res.json('Success');
    } catch (error) {
      next(error);
    }
  },
  async editItem(req, res, next, name, check) {
    try {
      const Model = models.getModel(name);
      const id = transformation.mongooseId(req.params.id);
      const item = await Model.findById(id);
      if (!item) throw new Error(`item.notfound`);
      if (check && req.user.role !== 'admin') {
        if (item.creator.toString() !== req.user._id) throw new Error('auth.false');
      }
      const saved = await Model.findByIdAndUpdate(id, transformation.getObject(req, name));
      res.status(200).json(saved);
    } catch (error) {
      next(error);
    }
  },
  async createItem(req, res, next, name) {
    try {
      const Model = models.getModel(name);
      const newItem = new Model(transformation.getObject(req, name));

      const item = await newItem.save();
      if (name == 'vacancy') this.createUserLog(req, 'vacancy', newItem._id, null, 'create');
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  },
  async getParent(req, res, next, name) {
    try {
      const parent = transformation.getParentName(name);
      const Model = models.getModel(parent);
      const items = await Model.find({ [name]: req.params.id }).lean();
      return res.json(items);
    } catch (error) {
      next(error);
    }
  },
  /**************
    USER RATING
  **************/
  async getUserRatingList(req, res, next, type) {
    try {
      const Model = models.getRatingModel(type);

      if (!validation.mongooseId(req.params.id)) {
        const user = await models
          .getModel('user')
          .findOne({ username: req.params.id }, '_id')
          .lean();
        if (!user) throw new Error('user.notfound');
        req.params.id = user._id;
      }

      const access = await this.getUserAccess(req, res, next, req.params.id);
      if (type === 'book' && !access.showBookInfo)
        return res.json({
          ratings: []
        });
      if (type === 'movie' && !access.showMovieInfo)
        return res.json({
          ratings: []
        });
      if (type === 'music' && !access.showMusicInfo)
        return res.json({
          ratings: []
        });
      if (type === 'course' && !access.showCourseInfo)
        return res.json({
          ratings: []
        });
      const ratings = await Model.findOne({ userId: req.params.id })
        .populate({
          path: !req.query.populate ? type + '.id' : '',
          select: 'name'
        })
        .lean();
      return res.json(ratings);
    } catch (error) {
      next(error);
    }
  },
  async getUserRatingListAll(req, res, next) {
    try {
      const BookRating = models.getRatingModel('books');
      const MovieRating = models.getRatingModel('movies');
      const CourseRating = models.getRatingModel('courses');
      const MusicRating = models.getRatingModel('music');

      if (!validation.mongooseId(req.params.id)) {
        const user = await models
          .getModel('user')
          .findOne({ username: req.params.id }, '_id')
          .lean();
        if (!user) throw new Error('user.notfound');

        req.params.id = user._id;
      }

      const access = await this.getUserAccess(req, res, next, req.params.id);

      let bookRating =
        access.showBookInfo &&
        BookRating.find({
          userId: req.params.id
        })
          .populate({
            path: 'book',
            select: 'name'
          })
          .lean();
      let movieRating =
        access.showMovieInfo &&
        MovieRating.find({
          userId: req.params.id
        })
          .populate({
            path: 'movie',
            select: 'name'
          })
          .lean();
      let musicRating =
        access.showMusicInfo &&
        MusicRating.find({ userId: req.params.id })
          .populate({
            path: 'music',
            select: 'name'
          })
          .lean();
      let courseRating =
        access.showCourseInfo &&
        CourseRating.find({ userId: req.params.id })
          .populate({
            path: 'course',
            select: 'name'
          })
          .lean();

      bookRating = await bookRating;
      movieRating = await movieRating;
      musicRating = await musicRating;
      courseRating = await courseRating;
      return res.json({
        books: bookRating || [],
        movies: movieRating || [],
        courses: courseRating || [],
        music: musicRating || []
      });
    } catch (error) {
      next(error);
    }
  },
  /************
    EDU STATUS
  ************/
  async setEducationStatus(req, res, next, type) {
    try {
      const EducationStatusModel = models.getEducationStatusModel(type);
      const status = await EducationStatusModel.updateOne(
        {
          userId: req.user._id,
          [type]: req.body.id
        },
        {
          userId: req.user._id,
          [type]: req.body.id,
          status: parseInt(req.body.status)
        },
        {
          upsert: true
        }
      );
      this.createUserLog(req, type, req.body.id, req.body.status, 'status');
      return res.json('success');
    } catch (error) {
      next(error);
    }
  },
  async getUserEducationStatus(req, res, next, type) {
    try {
      const EducationStatusModel = models.getEducationStatusModel(type);

      if (!validation.mongooseId(req.params.id)) {
        const user = await models
          .getModel('user')
          .findOne({ username: req.params.id }, '_id')
          .lean();
        if (!user) throw new Error('user.notfound');
        req.params.id = user._id;
      }
      const access = await this.getUserAccess(req, res, next, req.params.id);
      if (!access.showEducationInfo)
        return res.json({
          stasuses: []
        });
      const statuses = await EducationStatusModel.find({
        userId: req.params.id
      }).lean();
      return res.json(statuses);
    } catch (error) {
      next(error);
    }
  },
  async getUserEducationStatusAll(req, res, next) {
    try {
      const Subcategory = models.getEducationStatusModel('subcategory');
      const Topic = models.getEducationStatusModel('topic');
      const Subtopic = models.getEducationStatusModel('subtopic');

      if (!validation.mongooseId(req.params.id)) {
        const user = await models
          .getModel('user')
          .findOne({ username: req.params.id }, '_id')
          .lean();
        if (!user) throw new Error('user.notfound');
        req.params.id = user._id;
      }

      const access = await this.getUserAccess(req, res, next, req.params.id);
      if (!access.showEducationInfo)
        return res.json({
          subcategories: [],
          topics: [],
          subtopics: []
        });

      let subcategories = Subcategory.find({ userId: req.params.id }, '-_id -__v')
        .populate({ path: 'subcategory', select: 'name' })
        .lean();
      let topics = Topic.find({ userId: req.params.id }, '-_id -__v')
        .populate({
          path: 'topic',
          select: 'name'
        })
        .lean();
      let subtopics = Subtopic.find({ userId: req.params.id }, '-_id -__v')
        .populate({ path: 'subtopic', select: 'name' })
        .lean();
      subcategories = await subcategories;
      topics = await topics;
      subtopics = await subtopics;

      return res.json({
        subcategories,
        topics,
        subtopics
      });
    } catch (error) {
      next(error);
    }
  },
  /************
    USER ACCESS
  ************/
  async getUserAccess(req, res, next, user) {
    try {
      const User = models.getModel('user');
      const AccessModel = models.getModel('accessgroup');
      if (!req.user) {
        const data = await User.findById(user);
        return data.generalAccessOptions;
      }

      if (req.user._id.toString() === user.toString() || req.user.role === 'admin') {
        return {
          showEmail: true,
          showPhone: true,
          showName: true,
          showDOB: true,
          showBookInfo: true,
          showMovieInfo: true,
          showMusicInfo: true,
          showCourseInfo: true,
          showEducationInfo: true,
          giveTasks: true
        };
      }
      const accessGroups = await AccessModel.find({
        creator: user,
        users: {
          $in: req.user._id
        }
      }).lean();
      if (accessGroups.length === 0) {
        const data = await User.findById(user);
        return data.generalAccessOptions;
      }
      return accessGroups.reduce(
        (a, b) => ({
          showEmail: a.showEmail || b.options.showEmail,
          showPhone: a.showPhone || b.options.showPhone,
          showName: a.showName || b.options.showName,
          showDOB: a.showDOB || b.options.showDOB,
          showBookInfo: a.showBookInfo || b.options.showBookInfo,
          showMovieInfo: a.showMovieInfo || b.options.showMovieInfo,
          showMusicInfo: a.showMusicInfo || b.options.showMusicInfo,
          showCourseInfo: a.showCourseInfo || b.options.showCourseInfo,
          showEducationInfo: a.showEducationInfo || b.options.showEducationInfo,
          giveTasks: a.giveTasks || b.options.giveTasks
        }),
        {}
      );
    } catch (error) {
      next(error);
    }
  },
  /*******
    TASKS
  ********/
  async createTask(req, res, next) {
    try {
      const Task = models.getModel('task');
      const newTask = new Task(transformation.getObject(req, 'task'));
      const access = await this.getUserAccess(req, res, next, req.body.user);
      if (!access.giveTasks) throw new Error('access.false');
      const task = await newTask.save();
      this.checkAchievement(req, res, next, 'task');
      this.createUserLog(req, 'task', task._id, null, 'create');

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  },
  async getMyTasks(req, res, next) {
    try {
      const Task = models.getModel('task');
      const tasks = await Task.find({ creator: req.user._id })
        .populate('user item', 'name username')
        .lean();
      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  },
  async getTasksForMe(req, res, next) {
    try {
      const Task = models.getModel('task');
      const tasks = await Task.find({ user: req.user._id })
        .populate('creator item', 'name username')
        .lean();
      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  },
  async updateTaskStatus(req, res, next) {
    try {
      const Task = models.getModel('task');
      const task = await Task.findById(req.params.id);
      if (!task) {
        throw new Error('task.notfound');
      } else if (task.creator.toString() == req.user._id.toString() || task.user.toString() == req.user._id.toString()) {
        Task.updateOne(
          {
            _id: req.params.id
          },
          {
            status: req.body.status || task.status
          }
        ).exec();
      } else {
        throw new Error('auth.false');
      }
      return res.json('success');
    } catch (error) {
      next(error);
    }
  },
  async updateTaskArchive(req, res, next) {
    try {
      const Task = models.getModel('task');
      const task = await Task.findById(req.params.id);

      if (!task) {
        throw new Error('task.required');
      }
      const isCreator = task.creator.toString() == req.user._id.toString();
      const isUser = task.user.toString() == req.user._id.toString();

      if (isCreator || isUser) {
        Task.updateOne({ _id: req.params.id }, { archived: req.body.archived }).exec();
      } else {
        throw new Error('auth.false');
      }
      return res.json('success');
    } catch (error) {
      next(error);
    }
  },
  async deleteTask(req, res, next) {
    try {
      const Task = models.getModel('task');
      const task = await Task.findById(req.params.id);

      if (!task) {
        throw new Error('task.required');
      }
      const isCreator = task.creator.toString() == req.user._id.toString();
      const isUser = task.user.toString() == req.user._id.toString();
      if (
        (task.allowDelete.creator && task.allowDelete.user) ||
        (task.allowDelete.creator && isUser) ||
        (task.allowDelete.user && isCreator) ||
        (isCreator && isUser)
      ) {
        Task.deleteOne({ _id: req.params.id }).exec();
        return res.json('deleted');
      } else if (isCreator) {
        Task.updateOne({ _id: req.params.id }, { allowDelete: { creator: !task.allowDelete.creator } }).exec();
        return res.json('allowed');
      } else if (isUser) {
        Task.updateOne({ _id: req.params.id }, { allowDelete: { user: !task.allowDelete.user } }).exec();
        return res.json('allowed');
      } else {
        throw new Error('auth.false');
      }
    } catch (error) {
      next(error);
    }
  },
  async checkAchievement(req, res, next, type) {
    try {
      const response = await axios.post(process.env.ACHIEVEMENTS_LINK + `user/calculate/${type}/${req.user._id}`);
      if (response.data.new) res.io.to(req.headers.socket).emit('achievement', response.data);
      return;
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  },
  /**
   * Writes to MongoDB.LogDocuments.logs[ userLogObj ]
   * @param {Request} req - express Request object
   * @param {String} actionType - userLogObj.type
   * @param {String} [item] - userLogObj.item
   * @param {*} [value] - userLogObj.value
   * @param {String} action - userLogObj.action
   */
  async createUserLog(req, actionType, item, value, action) {
    try {
      axios.post(
        process.env.LOGS_LINK + `logs/${req.user._id}`,
        { actionType, item, value, action },
        {
          headers: {
            Authorization: process.env.LOGS_ACCESS_TOKEN
          }
        }
      );
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  }
};
