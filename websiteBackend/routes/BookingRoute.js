const express = require('express');
const {createBooking,getAllBooking} = require('../controllers/BookingController')


const router = express.Router();
router.post('/Book', createBooking);
router.get('/', getAllBooking);



module.exports = router;