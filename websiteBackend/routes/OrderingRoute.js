const express = require('express');
const {createOrdering,getAllOrdering} = require('../controllers/OrderingController')


const router = express.Router();
router.post('/order', createOrdering);
router.get('/', getAllOrdering);

module.exports = router;