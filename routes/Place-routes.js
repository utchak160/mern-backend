const express = require('express');
const {getPlaceById, getPlacesByUserId, addPlace, updatePlace, deletePlace} = require('../controllers/Place-controller')

const router = express.Router();

router.get('/:pid', getPlaceById);
router.get('/user/:uid', getPlacesByUserId);
router.post('/add', addPlace);
router.patch('/update/:pid', updatePlace);
router.delete('/delete/:pid', deletePlace);

module.exports = router;
