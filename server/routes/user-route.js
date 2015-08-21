var express = require('express'),
    User = require('../mongo_models/user'),
    router = express.Router();

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
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.code(500).send({ message: 'Internal error with finding user' });
            }

            res.json(user);
        });
    })
    .put(function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.code(500).send({ message: 'Internal error with finding user' });
            }

            user.save(function (err) {
                if (err) {
                    res.code(500).send({ message: 'Internal error with save user' });
                }

                res.json({ message: 'Ok', id: user._id });
            });
        });
    })
    .delete(function (req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.code(500).send({ message: 'Internal error with finding user' });
            }

            user.remove(function(err) {
                if (err) {
                    res.code(500).send({ message: 'Internal error with deleting user' });
                }

                res.json({ message: 'User successfully removed' });
            });
        });
    });

module.exports = router;