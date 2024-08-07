const TestModel = require("../models/testModel");
const CityDetails = require("../models/cityDetailsModel");

const cities = [
  { name: "Zürich", latitude: 47.3769, longitude: 8.5417 },
  { name: "Geneva", latitude: 46.2044, longitude: 6.1432 },
  { name: "Basel", latitude: 47.5596, longitude: 7.5886 },
  { name: "Lausanne", latitude: 46.5197, longitude: 6.6323 },
  { name: "Bern", latitude: 46.9479, longitude: 7.4474 },
  { name: "Winterthur", latitude: 47.4999, longitude: 8.7237 },
  { name: "Lucerne", latitude: 47.0502, longitude: 8.3093 },
  { name: "Sankt Gallen", latitude: 47.4245, longitude: 9.3767 },
  { name: "Biel/Bienne", latitude: 47.1367, longitude: 7.2456 },
  { name: "Bellinzona", latitude: 46.1923, longitude: 9.0177 },
  { name: "Thun", latitude: 46.7575, longitude: 7.6299 },
  { name: "Fribourg", latitude: 46.8065, longitude: 7.1617 },
  { name: "Uster", latitude: 47.3486, longitude: 8.7184 },
  { name: "Schaffhausen", latitude: 47.6965, longitude: 8.634 },
  { name: "Chur", latitude: 46.8501, longitude: 9.5293 },
  { name: "Vernier", latitude: 46.2137, longitude: 6.0792 },
  { name: "Sion", latitude: 46.2333, longitude: 7.3601 },
  { name: "Neuchâtel", latitude: 46.9937, longitude: 6.931 },
  { name: "Zug", latitude: 47.1668, longitude: 8.517 },
  { name: "Yverdon-les-Bains", latitude: 46.7783, longitude: 6.6412 },
  { name: "Emmen", latitude: 47.0852, longitude: 8.3051 },
  { name: "Dübendorf", latitude: 47.397, longitude: 8.6172 },
  { name: "Rapperswil-Jona", latitude: 47.2266, longitude: 8.8222 },
  { name: "Dietikon", latitude: 47.4017, longitude: 8.3973 },
  { name: "Wetzikon", latitude: 47.3242, longitude: 8.7993 },
  { name: "Meyrin", latitude: 46.2181, longitude: 6.0848 },
  { name: "Carouge", latitude: 46.1819, longitude: 6.1399 },
  { name: "Frauenfeld", latitude: 47.5582, longitude: 9.0697 },
  { name: "Kreuzlingen", latitude: 47.6479, longitude: 9.1874 },
  { name: "Wädenswil", latitude: 47.2298, longitude: 8.6684 },
  { name: "Aarau", latitude: 47.3917, longitude: 8.0447 },
  { name: "Riehen", latitude: 47.5793, longitude: 7.6571 },
  { name: "Allschwil", latitude: 47.5501, longitude: 7.5353 },
  { name: "Renens", latitude: 46.5395, longitude: 6.5798 },
  { name: "Wettingen", latitude: 47.4701, longitude: 8.3366 },
  { name: "Nyon", latitude: 46.3833, longitude: 6.2333 },
  { name: "Bülach", latitude: 47.5218, longitude: 8.5409 },
  { name: "Vevey", latitude: 46.4638, longitude: 6.8416 },
  { name: "Opfikon", latitude: 47.4392, longitude: 8.5694 },
  { name: "Reinach", latitude: 47.4817, longitude: 7.5986 },
  { name: "Baden", latitude: 47.4738, longitude: 8.306 },
  { name: "Onex", latitude: 46.1849, longitude: 6.0993 },
  { name: "Schlieren", latitude: 47.3925, longitude: 8.4485 },
  { name: "Adliswil", latitude: 47.318, longitude: 8.5243 },
  { name: "Volketswil", latitude: 47.3881, longitude: 8.6427 },
  { name: "Thalwil", latitude: 47.2901, longitude: 8.5635 },
  { name: "Olten", latitude: 47.3523, longitude: 7.9085 },
  { name: "Pully", latitude: 46.5147, longitude: 6.6611 },
  { name: "Regensdorf", latitude: 47.4381, longitude: 8.4511 },
  { name: "Ostermundigen", latitude: 46.9632, longitude: 7.4844 },
  { name: "Littau", latitude: 47.0509, longitude: 8.2911 },
  { name: "Solothurn", latitude: 47.2084, longitude: 7.5371 },
  { name: "Pratteln", latitude: 47.5209, longitude: 7.6761 },
  { name: "Freienbach", latitude: 47.2062, longitude: 8.7566 },
  { name: "Wallisellen", latitude: 47.4172, longitude: 8.5981 },
  { name: "Wohlen", latitude: 47.3509, longitude: 8.2842 },
  { name: "Herisau", latitude: 47.3865, longitude: 9.2788 },
  { name: "Steffisburg", latitude: 46.7721, longitude: 7.6365 },
  { name: "Morges", latitude: 46.5114, longitude: 6.4981 },
  { name: "Binningen", latitude: 47.5384, longitude: 7.5647 },
  { name: "Schwyz", latitude: 47.0218, longitude: 8.6546 },
  { name: "Arbon", latitude: 47.5164, longitude: 9.4403 },
  { name: "Liestal", latitude: 47.4847, longitude: 7.7356 },
  { name: "Stäfa", latitude: 47.2432, longitude: 8.7281 },
  { name: "Küsnacht", latitude: 47.3341, longitude: 8.566 },
  { name: "Thônex", latitude: 46.1864, longitude: 6.2086 },
  { name: "Meilen", latitude: 47.2892, longitude: 8.6514 },
  { name: "Versoix", latitude: 46.2835, longitude: 6.1662 },
  { name: "Richterswil", latitude: 47.2041, longitude: 8.7071 },
  { name: "Zollikon", latitude: 47.3298, longitude: 8.5764 },
  { name: "Gland", latitude: 46.4169, longitude: 6.2708 },
  { name: "Muri", latitude: 47.3518, longitude: 8.3444 },
  { name: "Ecublens", latitude: 46.5295, longitude: 6.5802 },
  { name: "Delémont", latitude: 47.3647, longitude: 7.3425 },
  { name: "Prilly", latitude: 46.5367, longitude: 6.5933 },
  { name: "Chêne-Bougeries", latitude: 46.2044, longitude: 6.1971 },
  { name: "Rüti", latitude: 47.2784, longitude: 8.8466 },
  { name: "Le Grand-Saconnex", latitude: 46.2333, longitude: 6.1167 },
  { name: "Münchenstein", latitude: 47.5164, longitude: 7.622 },
  { name: "Villars-sur-Glâne", latitude: 46.8128, longitude: 7.1522 },
  { name: "La Tour-de-Peilz", latitude: 46.4599, longitude: 6.8721 },
  { name: "Spreitenbach", latitude: 47.4192, longitude: 8.3543 },
  { name: "Veyrier", latitude: 46.1745, longitude: 6.214 },
  { name: "Bassersdorf", latitude: 47.4387, longitude: 8.6253 },
  { name: "Männedorf", latitude: 47.2467, longitude: 8.7146 },
  { name: "Romanshorn", latitude: 47.5682, longitude: 9.3847 },
  { name: "Oberwil", latitude: 47.4879, longitude: 7.5724 },
  { name: "Brugg", latitude: 47.4821, longitude: 8.2033 },
  { name: "Plan-les-Ouates", latitude: 46.1548, longitude: 6.1223 },
  { name: "Neuhausen am Rheinfall", latitude: 47.6773, longitude: 8.6116 },
  { name: "Sarnen", latitude: 46.8971, longitude: 8.2486 },
  { name: "Aesch", latitude: 47.4686, longitude: 7.5694 },
  { name: "Birsfelden", latitude: 47.5561, longitude: 7.6184 },
  { name: "Lutry", latitude: 46.5049, longitude: 6.6733 },
  { name: "Sursee", latitude: 47.1716, longitude: 8.1104 },
  { name: "Therwil", latitude: 47.5215, longitude: 7.5463 },
  { name: "Urdorf", latitude: 47.3902, longitude: 8.432 },
  { name: "Widnau", latitude: 47.4318, longitude: 9.6205 },
  { name: "Epalinges", latitude: 46.5368, longitude: 6.6597 },
  { name: "Rorschach", latitude: 47.4758, longitude: 9.4873 },
  { name: "Altdorf", latitude: 46.8791, longitude: 8.6423 },
  { name: "Goldach", latitude: 47.4881, longitude: 9.4703 },
  { name: "Arlesheim", latitude: 47.4978, longitude: 7.6155 },
  { name: "Zuchwil", latitude: 47.1989, longitude: 7.5715 },
  { name: "Neuenhof", latitude: 47.4069, longitude: 8.3556 },
  { name: "Lachen", latitude: 47.1963, longitude: 8.7532 },
  { name: "Fällanden", latitude: 47.3775, longitude: 8.6313 },
  { name: "Stans", latitude: 46.9595, longitude: 8.3683 },
  { name: "Oberentfelden", latitude: 47.3524, longitude: 8.0552 },
  { name: "Aarburg", latitude: 47.3228, longitude: 7.9016 },
  { name: "Chiasso", latitude: 45.8326, longitude: 9.0307 },
  { name: "Buchs", latitude: 47.1706, longitude: 9.4701 },
  { name: "Crissier", latitude: 46.5482, longitude: 6.5807 },
  { name: "Au", latitude: 47.2983, longitude: 8.6116 },
  { name: "Dietlikon", latitude: 47.4213, longitude: 8.618 },
  { name: "Chavannes-près-Renens", latitude: 46.5483, longitude: 6.5743 },
  { name: "Windisch", latitude: 47.4814, longitude: 8.2111 },
  { name: "Minusio", latitude: 46.1656, longitude: 8.8175 },
  { name: "Heimberg", latitude: 46.7493, longitude: 7.5742 },
  { name: "Nidau", latitude: 47.1263, longitude: 7.247 },
  { name: "Dornach", latitude: 47.4821, longitude: 7.6108 },
  { name: "Bottmingen", latitude: 47.5271, longitude: 7.5719 },
  { name: "Oberengstringen", latitude: 47.4025, longitude: 8.4474 },
  { name: "Frenkendorf", latitude: 47.4967, longitude: 7.7249 },
  { name: "Rolle", latitude: 46.4601, longitude: 6.3321 },
  { name: "Buchrain", latitude: 47.1263, longitude: 8.3791 },
  { name: "Massagno", latitude: 46.0268, longitude: 8.9461 },
  { name: "Uetikon am See", latitude: 47.2765, longitude: 8.6992 },
  { name: "Glarus", latitude: 47.039, longitude: 9.0687 },
  { name: "Rüschlikon", latitude: 47.3248, longitude: 8.5547 },
  { name: "Peseux", latitude: 47.0205, longitude: 6.944 },
  { name: "Appenzell", latitude: 47.3316, longitude: 9.4096 },
  { name: "Interlaken", latitude: 46.6864, longitude: 7.8632 },
  { name: "Cologny", latitude: 46.2143, longitude: 6.1711 },
  { name: "Erlenbach", latitude: 47.2989, longitude: 8.6204 },
  { name: "Colombier", latitude: 47.0079, longitude: 6.9153 },
  { name: "Courtepin", latitude: 46.9188, longitude: 7.207 },
  { name: "Greifensee", latitude: 47.3627, longitude: 8.6853 },
  { name: "Préverenges", latitude: 46.5193, longitude: 6.5555 },
  { name: "Gerlafingen", latitude: 47.1963, longitude: 7.6317 },
  { name: "Schwerzenbach", latitude: 47.3552, longitude: 8.644 },
  { name: "Oberrieden", latitude: 47.2805, longitude: 8.5629 },
  { name: "Geroldswil", latitude: 47.389, longitude: 8.3985 },
  { name: "Niederglatt", latitude: 47.4947, longitude: 8.4752 },
  { name: "Schönenwerd", latitude: 47.3506, longitude: 7.8845 },
  { name: "Niederlenz", latitude: 47.3142, longitude: 8.1495 },
  { name: "Cortaillod", latitude: 46.9274, longitude: 6.8501 },
  { name: "Saint-Sulpice", latitude: 46.5253, longitude: 6.5784 },
  { name: "Confignon", latitude: 46.1598, longitude: 6.1192 },
  { name: "Morbio Inferiore", latitude: 45.8612, longitude: 9.0242 },
  { name: "Caslano", latitude: 45.9632, longitude: 8.9468 },
  { name: "Gross Höchstetten", latitude: 47.0845, longitude: 7.6274 },
  { name: "Unterentfelden", latitude: 47.3644, longitude: 8.0447 },
  { name: "Paradiso", latitude: 45.9835, longitude: 8.9461 },
  { name: "Niederrohrdorf", latitude: 47.3913, longitude: 8.3093 },
  { name: "Hilterfingen", latitude: 46.7224, longitude: 7.6202 },
  { name: "Hunzenschwil", latitude: 47.3748, longitude: 8.1945 },
  { name: "Unterengstringen", latitude: 47.4081, longitude: 8.4369 },
  { name: "Langendorf", latitude: 47.2033, longitude: 7.5974 },
  { name: "Belmont-sur-Lausanne", latitude: 46.5345, longitude: 6.6482 },
  { name: "Widen", latitude: 47.3908, longitude: 8.3741 },
  { name: "Port", latitude: 46.2104, longitude: 6.1329 },
  { name: "Ennetbaden", latitude: 47.4605, longitude: 8.3104 },
  { name: "Feuerthalen", latitude: 47.6814, longitude: 8.6239 },
  { name: "Rheineck", latitude: 47.4825, longitude: 9.5608 },
  { name: "Vacallo", latitude: 45.8643, longitude: 8.9671 },
  { name: "Corsier-sur-Vevey", latitude: 46.4809, longitude: 6.8435 },
  { name: "Balerna", latitude: 45.8626, longitude: 9.0012 },
  { name: "Givisiez", latitude: 46.8253, longitude: 7.1977 },
  { name: "Coppet", latitude: 46.3455, longitude: 6.2697 },
  { name: "Turgi", latitude: 47.4804, longitude: 8.2612 },
  { name: "Coldrerio", latitude: 45.8557, longitude: 8.9543 },
  { name: "Rickenbach bei Wil", latitude: 47.4478, longitude: 9.072 },
  { name: "Horn", latitude: 47.4941, longitude: 9.5572 },
  { name: "Muralto", latitude: 46.1738, longitude: 8.7975 },
  { name: "Hauterive", latitude: 46.9542, longitude: 7.2243 },

];

function getCityCoordinates(cityName) {
  const city = cities.find((c) => c.name === cityName);
  return city ? { lat: city.latitude, lng: city.longitude } : null;
}

function haversineDistance(coords1, coords2) {
  const toRad = (angle) => (angle * Math.PI) / 180;
  const R = 6371; // Earth radius in kilometers

  const dLat = toRad(coords2.lat - coords1.lat);
  const dLng = toRad(coords2.lng - coords1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1.lat)) *
    Math.cos(toRad(coords2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

async function createTransfer(req, res) {
  try {
    const { pickupCity, dropoffCity } = req.body;

    if (!pickupCity || !dropoffCity) {
      return res.status(400).json({ message: "Pickup and dropoff locations are required" });
    }

    const pickupCoords = getCityCoordinates(pickupCity);
    const dropoffCoords = getCityCoordinates(dropoffCity);

    if (!pickupCoords || !dropoffCoords) {
      return res.status(400).json({ message: "Invalid pickup or dropoff location" });
    }

    const distance = haversineDistance(pickupCoords, dropoffCoords);
    let price = 0;
    if (distance <= 12) {
      price = 50
    }
    else if (distance <= 24) {
      price = 100;
    } else if (distance <= 36) {
      price = 150;
    } else {

      const extraDistance = distance - 36;
      const additionalBlocks = Math.ceil(extraDistance / 12);
      price = 150 + additionalBlocks * 50;
    }

    const transfer = new TestModel({
      pickupCity,
      dropoffCity,
      price,
      distance,
    });
    await transfer.save();
    res.status(201).json(transfer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllTransfers(req, res) {
  try {
    const transfers = await TestModel.find();
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTransferById(req, res) {
  const { id } = req.params;
  try {
    const transfer = await TestModel.findById(id);
    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.json(transfer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTransfer(req, res) {
  const { id } = req.params;
  try {
    await TestModel.findByIdAndDelete(id);
    res.json({ message: "Transfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createCities(req, res) {
  try {
    const { cityDetailsData } = req.body;

    if (!cityDetailsData) {
      return res.status(400).json({ message: "City name, latitude, and longitude are required" });
    }

    const newCity = new CityDetails({ cityDetailsData });
    await newCity.save();

    res.status(201).json({ message: "City added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getCities(req, res) {
  try {
    const cityOptions = await CityDetails.find();
    res.status(200).json(cityOptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createTransfer,
  getAllTransfers,
  getTransferById,
  deleteTransfer,
  createCities,
  getCities,
  getCityCoordinates,
  haversineDistance,
};