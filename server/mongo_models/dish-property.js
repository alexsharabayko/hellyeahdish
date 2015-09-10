var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DishCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

var DishKitchenSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

var DishPreferenceSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});


module.exports = {
    DishCategory: mongoose.model('DishCategory', DishCategorySchema),
    DishKitchen: mongoose.model('DishKitchen', DishCategorySchema),
    DishPreference: mongoose.model('DishPreference', DishCategorySchema)
};