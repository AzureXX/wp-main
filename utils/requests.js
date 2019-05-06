const passport = require('passport');

const transformation = require('./transformation');

module.exports = {
    async setRating(model, item, req) {
        let { rating, status, id } = req.body;
        if (rating) status = 0;
        else if (status) rating = 0;
        const dollarStr = item + '.$';
        const idStr = item + '.id';
        //gets current ratings of user
        const ratings = await model.findOne({ userId: req.user.id, [idStr]: id });

        if (!ratings) {
            // if item is not rated by this user yet
            await model.updateOne({ userId: req.user.id }, {
                userId: req.user.id,
                $push: {
                    [item]: { id, rating, status }
                }
            }, { upsert: true });
        } else {
            // if item already rated by this user
            await model.updateOne({ userId: req.user.id, [idStr]: id }, {
                $set: {
                    [dollarStr]: { id, rating, status }
                }
            });
        }
    },
    //Get array of items from DB by page
    async getAllItems(req, res, next, model, name, size, rating) {
        try {
            const offset = transformation.getOffset(req.params.page, size);
            let items = await model
                .find()
                .skip(offset)
                .limit(size);
            const ratedItems = [];
            if (req.user) {
                const ratings = await rating.findOne({ userId: req.user.id });
                items.forEach(item => {
                    const newItem = JSON.parse(JSON.stringify(item));

                    const index = ratings ?
                        ratings[name].findIndex(i => {
                            return i.id.toString() === item._id.toString();
                        }) :
                        -1;
                    if (index > -1) {
                        newItem.rating = ratings[name][index].rating;
                        newItem.status = ratings[name][index].status;
                    }
                    ratedItems.push(newItem);
                });
            }

            if (items.length == 0) throw new Error('No such page');
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
    }
};