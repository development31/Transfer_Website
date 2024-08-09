const express = require('express');
const router = express.Router();
const vitalSignsController = require('../controllers/vitalSignsController');

router.post('/vital', vitalSignsController.createVitalSigns);
router.get('/vital', vitalSignsController.getVitalSigns);

module.exports = router;
