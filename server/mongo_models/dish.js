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
    }
});

DishSchema.methods.toJSON = function () {
    return {
        name: this.name,
        description: this.description,
        mainImageUrl: this.mainImage.url ? this.mainImage.url : null,
        totalTime: this.totalTime,
        ingredients: this.ingredients,
        steps: this.steps.map(function (step) {
            return {
                description: step.description,
                startTime: step.startTime,
                imageUrl: step.image ? step.image.url : null
            }
        })
    };
};

module.exports = mongoose.model('Dish', DishSchema);