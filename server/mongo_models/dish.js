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
    imageUrl: String
});

var DishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [IngredientSchema],
    steps: [DishStepSchema],
    totalTime: Number,
    mainImageUrl: String,
    authorId: {
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Dish', DishSchema);