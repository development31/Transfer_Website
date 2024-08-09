const mongoose = require('mongoose');

const vitalSignsSchema = new mongoose.Schema({
    temp: String,
    bpSit: String,
    bpStand: String,
    pulse: String,
    resp: String,
    height: String,
    weight: String,
    allergies: String,
    diet: String
});

const VitalSigns = mongoose.model('VitalSigns', vitalSignsSchema);

module.exports = VitalSigns;
