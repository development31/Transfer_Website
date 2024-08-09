const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/ServicePlan1Controller');

router.post('/services', serviceController.createService);

module.exports = router;
