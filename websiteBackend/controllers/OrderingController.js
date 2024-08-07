const Ordering = require('../models/OrderingModel');
const createError = require("../middleware/error");
const createSuccess = require("../middleware/success");

const createOrdering = async (req, res, next) => {
    try {
        const { ProductName, Price, Quantity, buyerName, buyerContact, buyerEmail ,paymentStatus} = req.body;

        const newOrdering = new Ordering({
            ProductName: ProductName,
            Price: Price,
            Quantity: Quantity,
            buyerName: buyerName,
            buyerContact: buyerContact,
            buyerEmail: buyerEmail,
            paymentStatus:paymentStatus,
        });

        const savedOrdering = await newOrdering.save();
        return next(createSuccess(200, "User booked successfully", savedOrdering));

    } catch (error) {
        console.error('Error creating booking:', error);
        return next(createError(500, "Something went wrong"));
    }
};

const getAllOrdering = async (req, res, next) => {
    try {
        const orderingUsers = await Ordering.find();
        return next(createSuccess(200, "All Users", orderingUsers));

    } catch (error) {
        console.error('Error fetching bookings:', error);
        return next(createError(500, "Internal Server Error!"));
    }
};

module.exports = {
    createOrdering,
    getAllOrdering
};