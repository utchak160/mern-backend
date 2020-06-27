const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    center: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Place', placeSchema);
