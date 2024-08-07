const express = require("express");
const router = express.Router();
const vehicle = require('../controllers/transferController')

router.post("/transfer", vehicle.getVehicleManage);



module.exports = router;