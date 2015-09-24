var express = require('express'),
    Dish = require('../mongo_models/dish'),
    router = express.Router(),
    path = require('path'),
    multiparty = require('multiparty');

router.route('/dishes')
    .get(function (req, res) {
        Dish.find({}, function (err, dishes) {
            err && res.send(err);

            res.json(dishes);
        });
    })
    .post(function (req, res) {
        //var full = '';
        //
        //req.on('data', function (data) {
        //    full += data.toString();
        //});
        //
        //req.on('end', function () {
        //    var data = query.parse(full);
        //    var r = req;
        //    debugger;
        //});



        var form = new multiparty.Form({
            uploadDir: path.dirname(process.mainModule.filename) + '/user_files'
        });

        form.parse(req, function(err, fields, files) {
            debugger;
        });



        //var ing = [
        //    {
        //        name: 'meat1',
        //        quantity: '100g'
        //    },
        //    {
        //        name: 'tomato',
        //        quantity: '1'
        //    },
        //    {
        //        name: 'potato',
        //        quantity: '1 second'
        //    }
        //];
        //
        //var dish = new Dish({
        //    name: req.body.name,
        //    description: req.body.description,
        //    totalTime: req.body.totalTime,
        //    authorId: req.body.authorId,
        //    mainImageUrl: req.body.mainImageUrl  || ''
        //});
        //
        //ing.forEach(function (i) {
        //    dish.ingredients.push(i);
        //});
        //
        //dish.save(function (err) {
        //    err && res.send(err);
        //
        //    res.send('OK');
        //});
    })
    .delete(function (req, res) {
        Dish.remove({}, function (err) {
            err ? res.send(err) : res.send('OK');
        });
    });

module.exports = router;