const mongoose = require('mongoose');

const vehicleManageSchema = new mongoose.Schema({
  sno: {
    type: String,
    required: true,
  },
  vname: {
    type: String,
    required: true,
  },
  vcolor: {
    type: String,
    required: true,
  },
  vnumber: {
    type: String,
    required: true,
  },
  vseats: {
    type: String,
    required: true,
  },
  vprice: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  suitcase: {
    type: String,
    required: true,
  },
  vperKmcharge: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('VehicleManage', vehicleManageSchema);
