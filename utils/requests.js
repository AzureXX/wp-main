const validation = require('./validation');
const transformation = require('./transformation');

module.exports = {
  //Get array of items from DB by page
  async getAllItems(req, res, next, name, size) {
    try {
      const model = transformation.getModel(name);
      const populate = req.query.populate ? req.query.populate : '';
      let select = req.query.select ? req.query.select : '';
      if (select.match(/password/i)) select = '_id';
      const only = req.query.only ? req.query.only : '';
      const filter = {};
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

        filterJSON.category ? (filter.category = filterJSON.category) : null;

        filterJSON.city ? (filter.city = filterJSON.city) : null;
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
        });

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
      const model = transformation.getModel(name);
      const id = transformation.mongooseId(req.params.id);
      const populate = req.query.populate ? req.query.populate : '';
      let select = req.query.select ? req.query.select : '';
      if (select.match(/password/i)) select = '_id';
      const deep =
        req.query.deeppopulate ||
        'categories subcategories topics subtopics courses';
      const item = await model.findById(id).populate({
        path: populate,
        select: select,
        populate: { path: deep }
      });
      if (!item) throw new Error(`No such ${name} exist`);

      return res.json(item);
    } catch (error) {
      next(error);
    }
  },
  async deleteItem(req, res, next, name, check) {
    try {
      const model = transformation.getModel(name);
      if (!validation.mongooseId(req.params.id))
        throw new Error('ID is not valid');
      if (check && req.user.role !== 'admin') {
        const item = await model.findById(req.params.id);
        if (item.creator.toString() !== req.user.id)
          throw new Error('Not authorized');
      }
      if (['book', 'movie', 'course', 'person', 'music'].includes(name)) {
        const Rating = transformation.getRatingModel(name);
        Rating.deleteMany({ [name]: req.params.id }).exec();
      }
      if (['category', 'subcategory', 'topic', 'subtopic'].includes(name)) {
        const Status = transformation.getEducationStatusModel(name);
        Status.deleteMany({ [name]: req.params.id }).exec();
      }
      await model.findByIdAndDelete(req.params.id);
      return res.json('Success');
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
      if (check && req.user.role !== 'admin') {
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
      
      if (!validation.mongooseId(req.params.id)) {
        const user = await transformation
          .getModel('user')
          .findOne({ username: req.params.id }, '_id');
        if (!user) throw new Error('No such user');
        req.params.id = user._id;
      }

      const access = await this.getUserAccess(req,res,next, req.params.id);
      if(type === "book" && !access.showBookInfo) return res.json({ratings: []})
      if(type === "movie" && !access.showMovieInfo) return res.json({ratings: []})
      if(type === "music" && !access.showMusicInfo) return res.json({ratings: []})
      if(type === "course" && !access.showCourseInfo) return res.json({ratings: []})

      const ratings = await Model.findOne({ userId: req.params.id }).populate({
        path: !req.query.populate ? type + '.id' : '',
        select: 'name'
      });
      return res.json(ratings);
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

      if (!validation.mongooseId(req.params.id)) {
        const user = await transformation
          .getModel('user')
          .findOne({ username: req.params.id }, '_id');
        if (!user) throw new Error('No such user');
        req.params.id = user._id;
      }

      const access = await this.getUserAccess(req, res, next, req.params.id);

      let bookRating =
        access.showBookInfo &&
        BookRating.find({ userId: req.params.id }).populate({
          path: 'book',
          select: 'name'
        });
      let movieRating =
        access.showMovieInfo &&
        MovieRating.find({ userId: req.params.id }).populate({
          path: 'movie',
          select: 'name'
        });
      let musicRating =
        access.showMusicInfo &&
        MusicRating.find({ userId: req.params.id }).populate({
          path: 'music',
          select: 'name'
        });
      let courseRating =
        access.showCourseInfo &&
        CourseRating.find({ userId: req.params.id }).populate({
          path: 'course',
          select: 'name'
        });

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
  async updateItemRecommendations(req, res, next, name) {
    try {
      const itemRatingModel = transformation.getRatingModel(name);
      const itemModel = transformation.getModel(name);
      const itemRecommendationModel = transformation.getRecommendationModel(
        name
      );
      const plural = transformation.getPlural(name);

      const ratings = await itemRatingModel.find({ userId: req.user._id });
      let rated = [];
      if (ratings) {
        rated = ratings.map(item => item[name]);
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
      return res.json(recs);
    } catch (error) {
      next(error);
    }
  },
  async updateVacancyRecommendations(req, res, next) {
    try {
      const VacancyRecommendation = transformation.getRecommendationModel(
        'vacancy'
      );
      const Vacancy = transformation.getModel('vacancy');
      let vacancies = await Vacancy.find();
      vacancies = vacancies
        .map(item => ({
          data: item._id,
          points: Math.floor(Math.random() * 10000)
        }))
        .sort((a, b) => b.points - a.points);
      const recs = await VacancyRecommendation.findOneAndUpdate(
        { userId: req.user.id },
        { userId: req.user._id, vacancies },
        {
          upsert: true,
          returnOriginal: false,
          new: true
        }
      ).populate('vacancies.data');
      return res.json(recs);
    } catch (error) {
      next(error);
    }
  },
  async updateEducationRecommendations(req, res, next) {
    try {
      const Education = transformation.getRecommendationModel('education');
      const Category = transformation.getModel('category');
      const Subcategory = transformation.getModel('subcategory');
      const Topic = transformation.getModel('topic');
      const Subtopic = transformation.getModel('subtopic');

      let [categories, subcategories, topics, subtopics] = await Promise.all([
        Category.find(),
        Subcategory.find(),
        Topic.find(),
        Subtopic.find()
      ]);
      categories = categories
        .map(item => ({
          data: item._id,
          points: Math.floor(Math.random() * 10000)
        }))
        .sort((a, b) => b.points - a.points);
      subcategories = subcategories
        .map(item => ({
          data: item._id,
          points: Math.floor(Math.random() * 10000)
        }))
        .sort((a, b) => b.points - a.points);
      topics = topics
        .map(item => ({
          data: item._id,
          points: Math.floor(Math.random() * 10000)
        }))
        .sort((a, b) => b.points - a.points);
      subtopics = subtopics
        .map(item => ({
          data: item._id,
          points: Math.floor(Math.random() * 10000)
        }))
        .sort((a, b) => b.points - a.points);
      const recs = await Education.findOneAndUpdate(
        { userId: req.user.id },
        { userId: req.user._id, categories, subcategories, topics, subtopics },
        {
          upsert: true,
          returnOriginal: false,
          new: true
        }
      ).populate({
        path: 'categories.data subcategories.data topics.data subtopics.data',
        select: 'name icon'
      });
      return res.json(recs);
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
      if (name === 'education') {
        const recs = await itemRecommendationModel
          .findOne({ userId: req.user.id })
          .populate({
            path:
              'categories.data subcategories.data topics.data subtopics.data',
            select: 'name icon'
          });
        return res.json(recs);
      } else {
        const recs = await itemRecommendationModel
          .findOne({ userId: req.user.id })
          .populate({
            path: plural + '.data',
            select: 'name description img position companyName salary'
          });
        return res.json(recs);
      }
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
      return res.json('success');
    } catch (error) {
      next(error);
    }
  },
  async getUserEducationStatus(req, res, next, type) {
    try {
      const EducationStatusModel = transformation.getEducationStatusModel(type);
      
      if (!validation.mongooseId(req.params.id)) {
        const user = await transformation
          .getModel('user')
          .findOne({ username: req.params.id }, '_id');
        if (!user) throw new Error('No such user');
        req.params.id = user._id;
      }
      const access = await this.getUserAccess(req,res,next, req.params.id);
      if(!access.showEducationInfo) return res.json({ stasuses: [] });
      const statuses = await EducationStatusModel.find({
        userId: req.params.id
      });
      return res.json(statuses);
    } catch (error) {
      next(error);
    }
  },
  async getUserEducationStatusAll(req, res, next) {
    try {
      const Subcategory = transformation.getEducationStatusModel('subcategory');
      const Topic = transformation.getEducationStatusModel('topic');
      const Subtopic = transformation.getEducationStatusModel('subtopic');
      
      if (!validation.mongooseId(req.params.id)) {
        const user = await transformation
          .getModel('user')
          .findOne({ username: req.params.id }, '_id');
        if (!user) throw new Error('No such user');
        req.params.id = user._id;
      }

      const access = await this.getUserAccess(req,res,next, req.params.id);
      if(!access.showEducationInfo) return res.json({ subcategories: [], topics: [], subtopics: [] });

      let subcategories = Subcategory.find(
        { userId: req.params.id },
        '-_id -__v'
      ).populate({ path: 'subcategory', select: 'name' });
      let topics = Topic.find({ userId: req.params.id }, '-_id -__v').populate({
        path: 'topic',
        select: 'name'
      });
      let subtopics = Subtopic.find(
        { userId: req.params.id },
        '-_id -__v'
      ).populate({ path: 'subtopic', select: 'name' });
      subcategories = await subcategories;
      topics = await topics;
      subtopics = await subtopics;

      return res.json({ subcategories, topics, subtopics });
    } catch (error) {
      next(error);
    }
  },
  async getUserAccess(req, res, next, user) {
    try {
      const User = transformation.getModel("user")
      const AccessModel = transformation.getModel('accessgroup');
      if (!req.user) {
        const data = await User.findById(user)
        return data.generalAccessOptions;
      }
      if (req.user._id.toString() === user.toString())
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
      const accessGroups = await AccessModel.find({
        creator: user,
        users: { $in: req.user._id }
      });
      if (accessGroups.length === 0) {
        const data = await User.findById(user)
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
      return res.json(tasks);
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
      return res.json(tasks);
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
      return res.json('success');
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
      return res.json('success');
    } catch (error) {
      next(error);
    }
  }
};
