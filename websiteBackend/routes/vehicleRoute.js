const express = require('express');
const router = express.Router();
const VehicleModel = require('../models/vehicleModel');


const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};


router.post('/nearby', async (req, res) => {
    const { pickup, dropoff, vehicleType } = req.body;

    try {
        const vehicles = await VehicleModel.find({
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [pickup.longitude, pickup.latitude] },
                    $maxDistance: 50000 
                }
            },
            vehicleType: vehicleType
        });

        const distance = calculateDistance(
            pickup.latitude,
            pickup.longitude,
            dropoff.latitude,
            dropoff.longitude
        );

        const vehiclesWithPrices = vehicles.map(vehicle => {
            return {
                ...vehicle._doc,
                price: vehicle.pricePerKm * distance // Assuming price is per km
            };
        });

        res.json(vehiclesWithPrices);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
