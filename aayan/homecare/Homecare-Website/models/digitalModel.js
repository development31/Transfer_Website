const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const digitalSchema = mongoose.Schema(
    {
        client: {
            type: String,
            required: true
        },
        clientSign: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true 
        },
        financialSign: {
            type: String,
            required: true
        },
        healthSign: {
            type: String,
            required: true
        },
        
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('digital',digitalSchema );