var express = require('express'),
    DishCategory = require('../mongo_models/dish-category'),
    router = express.Router();

router.route('/dish-categories')
    .get(function (req, res) {
        DishCategory.find({}, function (err, dishes) {
            err && res.send(err);

            res.json(dishes);
        });
    })
    .post(function (req, res) {
        var data = require('./dish-categories.json');

        DishCategory.remove({}, function (err) {
            DishCategory.collection.insert(data, function (err) {
                err && res.send(err);

                res.json({ message: 'Ok' });
            })
        });
    })
    .delete(function (req, res) {
        DishCategory.remove({}, function (err) {
            err && res.send(err);

            res.json({message: 'Ok'});
        });
    });

module.exports = router;