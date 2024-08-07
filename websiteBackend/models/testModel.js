const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  pickupCity: { type: String, required: true },
  dropoffCity: { type: String, required: true },
  price: { type: Number, required: true },
  distance: {type:Number, required: true},
  createdAt: { type: Date, default: Date.now}

});

const TestModel = mongoose.model('Test', testSchema);

module.exports = TestModel;
