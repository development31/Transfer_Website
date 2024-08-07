const VehicleModel = require("../models/vehicleModel");

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const vehicleController = {
  createVehicle: async (req, res) => {
    try {
      const { name, image, vehicleType, latitude, longitude } = req.body;
      let pricePerKm;
      switch (vehicleType) {
        case '5-seater':
          pricePerKm = 2;
          break;
        case '7-seater':
          pricePerKm = 5;
          break;
        default:
          return res.status(400).json({ message: "Invalid vehicle type" });
      }

      const vehicle = new VehicleModel({
        name,
        image,
        vehicleType,
        pricePerKm,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      });
      await vehicle.save();
      res.status(201).json(vehicle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getAllVehicles: async (req, res) => {
    try {
      const vehicles = await VehicleModel.find();
      res.json(vehicles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteVehicle: async (req, res) => {
    try {
      await VehicleModel.findByIdAndDelete(req.params.id);
      res.json({ message: "Vehicle deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  searchVehiclesByLocation: async (req, res) => {
    const { pickup, dropoff } = req.body;

    try {
      const vehicles = await VehicleModel.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [pickup.longitude, pickup.latitude],
            },
            $maxDistance: 50000, // Adjust max distance as needed (in meters)
          },
        },
      });

      const distance = calculateDistance(
        pickup.latitude,
        pickup.longitude,
        dropoff.latitude,
        dropoff.longitude
      );

      const vehiclesWithPrices = vehicles.map((vehicle) => {
        return {
          ...vehicle._doc,
          price: vehicle.pricePerKm * distance, 
        };
      });

      res.json(vehiclesWithPrices);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = vehicleController;
