const ServicePlan1 = require('../models/ServicePlan1');


exports.createService = async (req, res) => {
  try {
    const service = new ServicePlan1(req.body);
    await service.save();
    res.status(201).json({ message: 'Client data saved successfully', service });
  } catch (error) {
    res.status(400).json({ message: 'Error saving client data', error });
  }
};
