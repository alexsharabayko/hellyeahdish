var express = require('express'),
    DishProperty = require('../mongo_models/dish-property'),
    router = express.Router(),
    DishCategory = DishProperty.DishCategory,
    DishKitchen = DishProperty.DishKitchen,
    DishPreference = DishProperty.DishPreference;

var deleteAll = function (req, res, next) {
    DishCategory.remove({}, function (err) {
        err && res.send(err);

        DishKitchen.remove({}, function (err) {
            err && res.send(err);

            DishPreference.remove({}, function (err) {
                err && res.send(err);

                next();
            })
        })
    });
};

var insertAll = function (req, res, next) {
    var data = require('./dish-properties.json');

    DishCategory.collection.insert(data.categories, function (err) {
        err && res.send(err);

        DishKitchen.collection.insert(data.kitchens, function (err) {
            err && res.send(err);

            DishPreference.collection.insert(data.preferences, function (err) {
                err && res.send(err);

                next()
            });
        });
    });
};

var showAll = function (req, res, next) {
    var data = {};

    DishCategory.find({}, function (err, categories) {
        err && res.send(err);

        data.categories = categories;

        DishKitchen.find({}, function (err, kitchens) {
            err && res.send(err);

            data.kitchens = kitchens;

            DishPreference.find({}, function (err, preferences) {
                err && res.send(err);

                data.preferences = preferences;
                req.data = data;

                next();
            });
        });
    });
};

router.route('/dish-properties')
    .get(showAll, function (req, res, data) {
        res.json(req.data);
    })
    .post(deleteAll, insertAll, function (req, res) {
        res.send({ message: 'Ok' });
    })
    .delete(deleteAll, function (req, res) {
        res.send({ message: 'Ok' })
    });

module.exports = router;