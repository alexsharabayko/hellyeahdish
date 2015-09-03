var express = require('express'),
    Dish = require('../mongo_models/dish'),
    router = express.Router();

router.route('/dishes')
    .get(function (req, res) {
        Dish.find({}, function (err, dishes) {
            err && res.send(err);

            res.json(dishes);
        });
    })
    .post(function (req, res) {
        var ing = [
            {
                name: 'meat1',
                quantity: '100g'
            },
            {
                name: 'tomato',
                quantity: '1'
            },
            {
                name: 'potato',
                quantity: '1 second'
            }
        ];

        var dish = new Dish({
            name: req.body.name,
            totalTime: req.body.totalTime,
            authorId: req.body.authorId,
            mainImageUrl: req.body.mainImageUrl  || ''
        });

        ing.forEach(function (i) {
            dish.ingredients.push(i);
        });

        dish.save(function (err) {
            err && res.send(err);

            res.send('OK');
        });
    })
    .delete(function (req, res) {
        Dish.remove({}, function (err) {
            err ? res.send(err) : res.send('OK');
        });
    });

module.exports = router;