var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: String
});

module.exports = mongoose.model('Product', ProductSchema);