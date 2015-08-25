var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    "rus-name": String,
    category: String
});

module.exports = mongoose.model('Product', ProductSchema);