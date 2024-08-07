const Booking = require('../models/BookingModel'); 
const createError = require("../middleware/error");
const createSuccess = require("../middleware/success");

const createBooking = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, date, time, message, vname, vnumber } = req.body;

    const newBooking = new Booking({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      date: date,
      time: time,
      message: message,
      vname: vname,
      vnumber: vnumber,
      paymentStatus: 'pending'
    });

    const savedBooking = await newBooking.save();
    return next(createSuccess(200, "User booked successfully", savedBooking));

  } catch (error) {
    console.error('Error creating booking:', error);
    return next(createError(500, "Something went wrong"));
  }
};

const getAllBooking = async (req, res, next) => {
  try {
    const bookingUsers = await Booking.find();
    return next(createSuccess(200, "All Users", bookingUsers));

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return next(createError(500, "Internal Server Error!"));
  }
};

module.exports = {
  createBooking,
  getAllBooking
};
