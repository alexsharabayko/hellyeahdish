var express = require('express'),
    app = express(),
    port = 4000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    User = require('./mongo_models/user');

mongoose.connect('localhost:27017/hellyeahdish');

app.use(allowCrossDomain);

app.use(bodyParser());

var router = express.Router();

router.route('/users')
    .get(function (req, res) {
        User.find(function (err, users) {
            err && res.send(err);

            res.json(users);
        })
    })
    .post(function (req, res) {
        var username = req.body.username,
            password = req.body.password,
            email = req.body.email;

        if (!(username && password && email)) {
            res.code(400).json({ message: 'Bad data' });
        }

        var user = new User({
            username: username,
            password: password,
            email: email,
            firstName: req.body.firstName || '',
            lastName: req.body.lastName || ''
        });

        user.save(function (err) {
            if (err) {
                res.code(500).send({ message: 'Internal error with save user' });
            }

            res.json({ message: 'Ok', id: user._id });
        });
    });

router.route('/users/:id')
    .get(function (req, res) {
        res.json({ message: 'Get user ' + req.params.id });
    })
    .put(function (req, res) {
        res.json({ message: 'Put user ' + req.params.id });
    })
    .delete(function (req, res) {
        res.json({ message: 'Delete user ' + req.params.id });
    });

app.use('/', router);

app.listen(port);
console.log('Listening port ' + port);




function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}