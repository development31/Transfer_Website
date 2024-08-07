const express = require("express");
const router = express.Router();
const {payment, getAllTransactions} = require('../controllers/paymentGetWays')

router.post("/", payment);
router.get('/get', getAllTransactions);



module.exports = router;