var express = require('express'),
    Product = require('../mongo_models/product'),
    router = express.Router();

router.route('/products')
    .get(function (req, res) {
        console.log('Hello');
        Product.find(function (err, products) {
            err && res.send(err);

            res.json(products);
        })
    })
    .post(function (req, res) {
        var name = req.body.name;

        name || res.code(400).json({ message: 'Bad data' });

        var product = new Product({
            name: name,
            category: req.body.category
        });

        product.save(function (err) {
            if (err) {
                res.code(500).send({ message: 'Internal error with save user' });
            }

            res.json({ message: 'Ok', id: product._id });
        });
    });

//router.route('/users/:id')
//    .get(function (req, res) {
//        Product.findById(req.params.id, function (err, user) {
//            if (err) {
//                res.code(500).send({ message: 'Internal error with finding user' });
//            }
//
//            res.json(user);
//        });
//    })
//    .put(function (req, res) {
//        Product.findById(req.params.id, function (err, user) {
//            if (err) {
//                res.code(500).send({ message: 'Internal error with finding user' });
//            }
//
//            user.save(function (err) {
//                if (err) {
//                    res.code(500).send({ message: 'Internal error with save user' });
//                }
//
//                res.json({ message: 'Ok', id: user._id });
//            });
//        });
//    })
//    .delete(function (req, res) {
//        Product.findById(req.params.id, function(err, user) {
//            if (err) {
//                res.code(500).send({ message: 'Internal error with finding user' });
//            }
//
//            user.remove(function(err) {
//                if (err) {
//                    res.code(500).send({ message: 'Internal error with deleting user' });
//                }
//
//                res.json({ message: 'User successfully removed' });
//            });
//        });
//    });

module.exports = router;
