const mongoose = require('mongoose');
const OrderingSchema = new mongoose.Schema({
    ProductName: { type: String, required: true },
    Price: { type: String, required: true },
    Quantity: { type: Number, required: true },
    buyerName: { type: String, required: true },
    buyerContact: { type: Number, required: true },
    buyerEmail: { type: String, required: true },
    paymentStatus: { type: String, required: true },
},
    {
        timestamps: true
    }


);

module.exports = mongoose.model('Ordering', OrderingSchema);

