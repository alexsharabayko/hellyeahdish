var express = require('express'),
    app = express(),
    port = 3111,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

mongoose.connect('localhost:27017/moneyTrashServer');

app.use(allowCrossDomain);

app.use(bodyParser());

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.listen(port);
console.log('Listening port ' + port);




function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}