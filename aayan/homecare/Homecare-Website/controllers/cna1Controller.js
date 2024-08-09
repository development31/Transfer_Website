// controllers/cna1Controller.js
const Cna1 = require('../models/cna1Model');

exports.createCna1 = async (req, res) => {
    const { patientName, gender, mrNumber, date, primaryDiagnosis, secondaryDiagnosis, pcpName, otherPhysicianName } = req.body;

    try {
        const newCna1 = new Cna1({ patientName, gender, mrNumber, date, primaryDiagnosis, secondaryDiagnosis, pcpName, otherPhysicianName });
        const savedCna1 = await newCna1.save();
        res.status(201).json(savedCna1);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
