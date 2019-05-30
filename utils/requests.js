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

      if (!ratings) {
        // if item is not rated by this user yet
        await model.updateOne(
          { userId: req.user.id },
          {
            userId: req.user.id,
            $push: {
              [item]: { id, rating, status }
            }
          },
          { upsert: true }
        );
      } else {
        // if item already rated by this user
        await model.updateOne(
          { userId: req.user.id, [idStr]: id },
          {
            $set: {
              [dollarStr]: { id, rating, status }
            }
          }
        );
      }
      res.json('success');
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
          populate: {path: "categories subcategories topics subtopics"}
        });
      const ratedItems = [];
      if (req.user && rating) {
        const ratings = await rating.findOne({ userId: req.user.id });
        items.forEach(item => {
          const newItem = JSON.parse(JSON.stringify(item));
          
          const index = ratings
            ? ratings[name].findIndex(i => {
                return i.id.toString() === item._id.toString();
              })
            : -1;
          if (index > -1) {
            newItem.rating = ratings[name][index].rating;
            newItem.status = ratings[name][index].status;
          }
          ratedItems.push(newItem);
        });
      }

      if (items.length < size)
        res.json({
          lastPage: true,
          [name]: ratedItems.length > 0 ? ratedItems : items
        });
      else
        res.json({
          lastPage: false,
          [name]: ratedItems.length > 0 ? ratedItems : items
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
        populate: {path: "categories subcategories topics subtopics"}
      });
      if (!item) throw new Error(`No such ${name} exist`);
      const newItem = JSON.parse(JSON.stringify(item));
      let ratings;
      if (req.user && rating) {
        ratings = await rating.findOne({ userId: req.user.id });
        const index = ratings  
          ? ratings[name].findIndex(i => {
              return i.id && i.id.toString() === item._id.toString();
            })
          : -1;
        if (index > -1) {
          newItem.rating = ratings[name][index].rating;
          newItem.status = ratings[name][index].status;
        }
      }
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  },
  async deleteItem(req, res, next, model, check) {
    try {
      if (!validation.mongooseId(req.params.id))
        throw new Error('ID is not valid');
      if(check) {
        const item = await model.findById(req.params.id);
        if(item.creator.toString() !== req.user.id) throw new Error('Not authorized');
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
      if(check) {
        if(item.creator.toString() !== req.user.id) throw new Error('Not authorized');
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
      const ratings = await Model.findOne({ userId: req.params.id }).populate(
        {
          path: type + '.id',
          select: "name"
        }
      );
      res.json(ratings);
    } catch (error) {
      next(error);
    }
  }
};
