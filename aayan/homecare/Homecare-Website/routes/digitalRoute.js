const express = require('express');
const {digital,getAllDigitals,getDigital,deleteDigital, updateDigital} = require('../controllers/digitalController');

const router = express.Router();

router.post('/digitaled', digital);
router.get('/',getAllDigitals);
router.get('/:id',getDigital);
router.put('/:id',updateDigital);
router.delete('/:id',deleteDigital);


module.exports = router;