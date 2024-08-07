const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    message: { type: String, required: true },
    vname: { type: Number, required: false },
    vnumber: { type: String, required: false },
    // paymentStatus: { type: String, required: true, default: 'Pending' }, 
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
