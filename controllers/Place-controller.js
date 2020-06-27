const geocode = require('../utils/geocode');
const Place = require('../models/Place');
const User = require('../models/User');
const mongoose = require('mongoose');

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (e) {
        return res.status(404).json({error: 'Place not found by provided ID'});
    }
    if (!place) {
        return res.status(404).json({error: 'Place not found by provided ID'});
    }
    res.json({place: place.toObject({getters: true})});
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    const places = await User.findById(userId).populate('places');
    if (!places.places || places.places.length === 0) {
        return res.status(404).json({error: 'No Place not found by provided UserID'});
    }
    res.json({places: places.places.map(place => place.toObject( {getters: true} ))});
};

const addPlace = async (req, res, next) => {
    const {title, description, image, address, creator} = req.body;
    let coordinates;
    try {
        coordinates = await geocode(address);
    } catch (e) {
        return next(new Error('Entered address is not correct'));
    }
    const place = new Place({
        title,
        description,
        image,
        address,
        center: coordinates,
        creator
    });
    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        return res.status(500).send({message: 'Something went wrong'});
    }
    if (!user) {
        return res.status(422).send({message: 'Creator is not authenticated'});
    }
    console.log(user);
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.save({session: sess});
        user.places.push(place);
        await user.save({session: sess});
        await sess.commitTransaction();
    } catch (e) {
        return res.status(422).send({message: 'Add place failed. Please try again!'});
    }
    res.status(201).json({place: place.toObject({getters: true})});
};

const updatePlace = async (req, res, next) => {
    const placeID = req.params.pid;
    const {title, description} = req.body;
    const place = await Place.findById(placeID);
    place.title = title;
    place.description = description;
    place.save();

    if (!place) {
        return res.status(404).send({error: 'Place not found'});
    }
    res.json({message: 'Place Updated Successfully', place: place});
};

const deletePlace = async (req, res, next) => {
    const placeID = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeID).populate('creator');
        console.log(place);
    } catch (e) {
        return res.status(500).send({error: 'Something went wrong'});
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();
    } catch (e) {
        return res.status(500).send({error: 'Could not delete place. Please try again!'});
    }
    res.json({message: 'Place Deleted Successfully'});
};

module.exports = {
    getPlaceById,
    getPlacesByUserId,
    addPlace,
    updatePlace,
    deletePlace
};
