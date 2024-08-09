const VitalSigns = require('../models/VitalSigns');

exports.createVitalSigns = async (req, res) => {
    try {
        const newVitalSigns = new VitalSigns(req.body);
        await newVitalSigns.save();
        res.status(201).json({ message: 'Vital signs saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getVitalSigns = async (req, res) => {
    try {
        const vitalSigns = await VitalSigns.find();
        res.status(200).json(vitalSigns);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
