const express = require("express");
const router = express.Router();
const {createTransfer, getAllTransfers, getTransferById, deleteTransfer, createCities, getCities } = require("../controllers/testController");

router.post("/", createTransfer);
router.get("/all", getAllTransfers);
router.get("/:id", getTransferById);
router.delete("/:id", deleteTransfer);

router.post("/cities", createCities);
router.get("/", getCities);

module.exports = router;
