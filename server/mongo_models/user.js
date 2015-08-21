var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    level: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: ''
    },
    createdAt: Date
});

UserSchema.pre('save', function (next) {
    this.createdAt = Date.now();

    next();
});

module.exports = mongoose.model('User', UserSchema);