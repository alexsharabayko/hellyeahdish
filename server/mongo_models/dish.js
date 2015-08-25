var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: String
});

var DishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [IngredientSchema],
    totalTime: Number,
    authorId: {
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Dish', DishSchema);