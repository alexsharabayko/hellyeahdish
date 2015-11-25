var express = require('express'),
    Dish = require('../mongo_models/dish'),
    User = require('../mongo_models/user'),
    router = express.Router(),
    path = require('path'),
    multiparty = require('multiparty'),
    cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dz6xtu1hj',
    api_key: '933492627497273',
    api_secret: 'QSfpwFxgACzH0kbKQPe-3dRrOaI'
});

var parseFormData = function (req, res, next) {
    var form = new multiparty.Form({
        uploadDir: path.dirname(process.mainModule.filename) + '/user_files'
    });

    form.parse(req, function(err, fields, files) {
        err && res.send(err);

        req.fields = fields;
        req.files = files;

        next();
    });
};

var serializeFormData = function (req, res, next) {
    var dish = {};

    req.body.token = req.fields.userToken[0];

    dish.name = req.fields.name[0];
    dish.description = req.fields.description[0];
    dish.totalTime = parseInt(req.fields.totalTime[0], 10);

    dish.mainImage = req.files.mainImage[0].size ? req.files.mainImage[0] : null;

    dish.categoryId = req.fields.category[0];
    dish.kitchenId = req.fields.kitchen[0];
    dish.preferenceId = req.fields.preference[0];

    dish.ingredients = [];
    req.fields.ingredientsNames.forEach(function (ingredientName, i) {
        dish.ingredients[i] = {
            name: ingredientName,
            quantity: req.fields.ingredientsQuantities[i]
        };
    });

    dish.steps = [];
    req.fields.stepsDescriptions.forEach(function (stepDescription, i) {
        dish.steps[i] = {
            description: stepDescription,
            startTime: parseInt(req.fields.stepsStartTimes[i], 10),
            image: req.files.stepsImages[i].size ? req.files.stepsImages[i] : null
        };
    });

    req.dish = dish;
    next();
};

var getUserByToken = function (req, res, next) {
    User.findOne({token: req.body.token}, function (err, user) {
        err && res.sendStatus(500);

        if (user) {
            req.user = user;
            next();
        }
        else {
            res.status(404).send({message: 'Bad credentials'});
        }
    });
};

var uploadMainImageToCDN = function (req, res, next) {
    if (req.dish.mainImage) {
        cloudinary.uploader.upload(req.dish.mainImage.path, function (result) {
            req.dish.mainImage = result;
            next();
        }, {
            x: req.fields.mainImageX[0],
            y: req.fields.mainImageY[0],
            width: req.fields.mainImageWidth[0],
            height: req.fields.mainImageHeight[0],
            crop: 'crop'
        });
    }
    else {
        next();
    }
};

var UploadStepsImagesToCDN = function uploader (req, res, next) {
    if (req.stepIndex === undefined) {
        req.stepIndex = 0;
    }

    if (req.dish.steps[req.stepIndex].image) {
        cloudinary.uploader.upload(req.dish.steps[req.stepIndex].image.path, function (result) {
            req.dish.steps[req.stepIndex].image = result;

            req.stepIndex += 1;

            if (req.stepIndex === req.dish.steps.length) {
                delete req.stepIndex;
                next();
            }
            else {
                uploader(req, res, next);
            }
        });
    }
    else {
        req.stepIndex += 1;

        if (req.stepIndex === req.dish.steps.length) {
            delete req.stepIndex;
            next();
        }
        else {
            uploader(req, res, next);
        }
    }
};

var saveDish = function (req, res, next) {
    req.dish.authorId = req.user._id;

    var dish = new Dish(req.dish);

    dish.save(function (err, d) {
        err && res.send(err);
        next();
    });
};

var createDishQuery = function (req, res, next) {
    var parameters = ['kitchenId', 'categoryId', 'preferenceId'],
        q = {};

    parameters.forEach(function (param) {
        if (req.query[param]) {
            q[param] = req.query[param];
        }
    });

    req.dishQuery = q;
    next();
};

var createDishSort = function (req, res, next) {
    req.dishSort = req.query.sort || 'name';
    next();
};

var createDishSelect = function (req, res, next) {
    req.dishSelect = {
        name: 1,
        description: 1,
        'mainImage.url': 1,
        totalTime: 1,
        authorId: 1,
        categoryId: 1,
        kitchenId: 1,
        preferenceId: 1
    };
    next();
};

var createUserSelect = function () {
    return {
        username: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        level: 1
    }
};

router.route('/dishes')
    .get(createDishQuery, createDishSort, createDishSelect, function (req, res) {
        Dish.find(req.dishQuery).sort(req.dishSort).select(req.dishSelect).exec(function (err, dishes) {
            err && res.send(err);

            res.json(dishes);
        });
    })
    .post(parseFormData, serializeFormData, getUserByToken, uploadMainImageToCDN, UploadStepsImagesToCDN, saveDish, function (req, res) {
        res.json({ message: 'Ok' });
    })
    .delete(function (req, res) {
        Dish.remove({}, function (err) {
            err ? res.send(err) : res.send('OK');
        });
    });

router.route('/dishes/:id')
    .get(function (req, res) {
        Dish.findById(req.params.id, function (err, dish) {
            err && res.send(err);

            User.findById(dish.authorId).select(createUserSelect()).exec(function (err, user) {
                err && res.send(err);

                dish = dish.toJSON();
                dish.author = user;

                res.json(dish);
            });
        });
    });

module.exports = router;