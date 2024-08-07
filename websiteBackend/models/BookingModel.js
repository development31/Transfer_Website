const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phoneNumber: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // Storing time as a string
    message: { type: String, required: true },
    vname: { type: String },
    vnumber: { type: String },
    paymentStatus: { type: String, default: 'pending' }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
