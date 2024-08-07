const VehicleManage = require("../models/VehicleManagemodel");

exports.getVehicleManage = async (req, res) => {
  try {
    const { seats } = req.body;
    let vehicles;

    if (seats) {
      vehicles = await VehicleManage.aggregate([
        {
          $addFields: {
            vseatsNum: { $toInt: "$vseats" }
          }
        },
        {
          $match: { vseatsNum: { $gte: parseInt(seats) } }
        },
        { $sort: { vseatsNum: 1 } },
        { $limit: 4 }
      ]);
    } else {
      vehicles = await VehicleManage.find();
    }

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
