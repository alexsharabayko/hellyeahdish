var express = require('express'),
    Dish = require('../mongo_models/dish'),
    router = express.Router(),
    path = require('path'),
    multiparty = require('multiparty'),
    cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dz6xtu1hj',
    api_key: '933492627497273',
    api_secret: 'QSfpwFxgACzH0kbKQPe-3dRrOaI'
});

router.route('/dishes')
    .get(function (req, res) {
        Dish.find({}, function (err, dishes) {
            err && res.send(err);

            res.json(dishes);
        });
    })
    .post(function (req, res) {
        var form = new multiparty.Form({
            uploadDir: path.dirname(process.mainModule.filename) + '/user_files'
        });

        form.parse(req, function(err, fields, files) {
            cloudinary.uploader.upload(files.mainImage[0].path, function(result) {
                debugger;
            }, {
                public_id: 'dishes'
            });
        });
    })
    .delete(function (req, res) {
        Dish.remove({}, function (err) {
            err ? res.send(err) : res.send('OK');
        });
    });

module.exports = router;