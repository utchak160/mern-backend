const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 7
    },
    image: {
        type: String,
        required: true
    },
    places: [{
        type: mongoose.Types.ObjectId,
        ref: 'Place',
        required: true
    }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);