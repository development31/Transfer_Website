const express = require('express');
const router = express.Router();
const clientServiceAgreementController = require('../controllers/clientServiceAgreementController');

router.post('/agreements', clientServiceAgreementController.createAgreement);
router.get('/agreements', clientServiceAgreementController.getAllAgreements);
router.get('/agreements/:id', clientServiceAgreementController.getAgreement);
router.put('/agreements/:id', clientServiceAgreementController.updateAgreement);
router.delete('/agreements/:id', clientServiceAgreementController.deleteAgreement);

module.exports = router;
