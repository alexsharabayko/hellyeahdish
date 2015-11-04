var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: String
});

var DishStepSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    startTime: Number,
    image: Object
});

var DishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    ingredients: [IngredientSchema],
    steps: [DishStepSchema],
    totalTime: Number,
    mainImage: Object,
    authorId: {
        type: Schema.Types.ObjectId
    },
    categoryId: Schema.Types.ObjectId,
    kitchenId: Schema.Types.ObjectId,
    preferenceId: Schema.Types.ObjectId
});

module.exports = mongoose.model('Dish', DishSchema);