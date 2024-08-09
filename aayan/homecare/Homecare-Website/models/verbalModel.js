const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verbalSchema = new Schema(
    {
        clientName: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        order: {
            type: String,
            required: true
        },
        nurseSign: {
            type: String,
            required: true
        },
        patientName: {
            type: String,
            required: true
        },
        physicianSign: {
            type: String,
            required: true
        },
        printedName: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Verbal', verbalSchema);
