// const express = require("express");
// const User = require('../models/orderModel');
// const router = express.Router();
// const {createOrder, getAllOrders, getOrderById, deleteOrder } = require("../controllers/orderController");

// router.post("/", createOrder);
// router.get("/all", getAllOrders);
// router.get("/:id", getOrderById);
// router.delete("/:id", deleteOrder);

// module.exports = router;
const express = require('express');
const {createOrder,getAllOrder} = require('../controllers/OrderController')


const router = express.Router();
router.post('/ordering', createOrder);
router.get('/', getAllOrder);



module.exports = router;