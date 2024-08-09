const express = require('express');
const { verbal, getAllVerbals, getVerbal, deleteVerbal, updateVerbal } = require('../controllers/verbalController');

const router = express.Router();

router.post('/verbaled', verbal);
router.get('/', getAllVerbals);
router.get('/:id', getVerbal);
router.put('/:id', updateVerbal);
router.delete('/:id', deleteVerbal);

module.exports = router;
