const mongoose = require('mongoose');


const cityDataSchema = new mongoose.Schema({
    cityName: String,
    latitude: String,
    longitude: String
})
const cityDetailsSchema = new mongoose.Schema({ 
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   latitude: {
//     type: Number,
//     required: true
//   },
//   longitude: {
//     type: Number,
//     required: true
//   }
cityDetailsData:[cityDataSchema]

},);

const CityDetails = mongoose.model('CityDetails', cityDetailsSchema);

module.exports = CityDetails;
