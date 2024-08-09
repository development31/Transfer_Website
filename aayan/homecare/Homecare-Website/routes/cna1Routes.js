// routes/cna1Routes.js
const express = require('express');
const router = express.Router();
const cna1Controller = require('../controllers/cna1Controller');

router.post('/cna1', cna1Controller.createCna1);

module.exports = router;
