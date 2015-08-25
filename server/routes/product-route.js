var express = require('express'),
    Product = require('../mongo_models/product'),
    router = express.Router(),
    fs = require('fs');

router.route('/products')
    .get(function (req, res) {
        Product.find(function (err, products) {
            err && res.send(err);

            res.json(products);
        })
    })
    .post(function (req, res) {
        var data = require('./products.json');

        Product.remove({}, function (err) {
            Product.collection.insert(data, function (err) {
                err && res.send(err);

                res.json({ message: 'Ok' });
            })
        });
    });

//router.route('/users/:id')
//    .get(function (req, res) {
//        Product.findById(req.params.id, function (err, user) {
//            if (err) {
//                res.status(500).send({ message: 'Internal error with finding user' });
//            }
//
//            res.json(user);
//        });
//    })
//    .put(function (req, res) {
//        Product.findById(req.params.id, function (err, user) {
//            if (err) {
//                res.status(500).send({ message: 'Internal error with finding user' });
//            }
//
//            user.save(function (err) {
//                if (err) {
//                    res.status(500).send({ message: 'Internal error with save user' });
//                }
//
//                res.json({ message: 'Ok', id: user._id });
//            });
//        });
//    })
//    .delete(function (req, res) {
//        Product.findById(req.params.id, function(err, user) {
//            if (err) {
//                res.status(500).send({ message: 'Internal error with finding user' });
//            }
//
//            user.remove(function(err) {
//                if (err) {
//                    res.status(500).send({ message: 'Internal error with deleting user' });
//                }
//
//                res.json({ message: 'User successfully removed' });
//            });
//        });
//    });

module.exports = router;
