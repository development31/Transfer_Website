

const Order = require('../models/OrderModal'); 
const createError = require("../middleware/error");
const createSuccess = require("../middleware/success");

const createOrder = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, message, vname, vnumber } = req.body;

    const newOrder = new Order({
      name:name,
      email:email,
      phoneNumber:phoneNumber,
      message:message,
      vname:vname,
      vnumber:vnumber
    });

    const savedOrder = await newOrder.save();
    return next(createSuccess(200, "User booked successfully", savedOrder));

  } catch (error) {
    console.error('Error creating booking:', error);
    return next(createError(500, "Something went wrong"));
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    const orderUsers = await Order.find();
    return next(createSuccess(200, "All Users", orderUsers));

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return next(createError(500, "Internal Server Error!"));
  }
};

module.exports = {
  createOrder,
  getAllOrder
};
