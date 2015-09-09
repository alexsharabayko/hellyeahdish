var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DishCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('DishCategory', DishCategorySchema);