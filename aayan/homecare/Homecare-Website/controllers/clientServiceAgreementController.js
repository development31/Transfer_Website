const ClientServiceAgreement = require('../models/clientServiceAgreementModel');
const createError = require('../middleware/error');
const createSuccess = require('../middleware/success');

// Create new Client Service Agreement
const createAgreement = async (req, res, next) => {
    try {
        const { clientName, clientAddress, initials, insuranceProvider, clientSignature, clientDate, financialSignature, financialDate, representativeSignature, representativeDate } = req.body;

        // Check for missing fields
        if (!clientName || !clientAddress || !initials || !insuranceProvider || !clientSignature || !clientDate || !financialSignature || !financialDate || !representativeSignature || !representativeDate) {
            return next(createError(400, "All fields are required"));
        }

        // Validate date fields
        const clientDateParsed = new Date(clientDate);
        const financialDateParsed = new Date(financialDate);
        const representativeDateParsed = new Date(representativeDate);

        if (isNaN(clientDateParsed) || isNaN(financialDateParsed) || isNaN(representativeDateParsed)) {
            return next(createError(400, "Invalid date format"));
        }

        const newAgreement = new ClientServiceAgreement({
            clientName,
            clientAddress,
            initials,
            insuranceProvider,
            clientSignature,
            clientDate: clientDateParsed,
            financialSignature,
            financialDate: financialDateParsed,
            representativeSignature,
            representativeDate: representativeDateParsed,
        });

        await newAgreement.save();
        return next(createSuccess(200, "Client Service Agreement created successfully", newAgreement));
    } catch (error) {
        console.error("Error creating agreement:", error);
        return next(createError(500, "Something went wrong"));
    }
};


// Get all Client Service Agreements
const getAllAgreements = async (req, res, next) => {
    try {
        const agreements = await ClientServiceAgreement.find();
        return next(createSuccess(200, "All Client Service Agreements retrieved successfully", agreements));
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
};

// Get a single Client Service Agreement by ID
const getAgreement = async (req, res, next) => {
    try {
        const agreement = await ClientServiceAgreement.findById(req.params.id);
        if (!agreement) {
            return next(createError(404, "Client Service Agreement not found"));
        }
        return next(createSuccess(200, "Client Service Agreement retrieved successfully", agreement));
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
};

// Update a Client Service Agreement by ID
const updateAgreement = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agreement = await ClientServiceAgreement.findByIdAndUpdate(id, req.body, { new: true });
        if (!agreement) {
            return next(createError(404, "Client Service Agreement not found"));
        }
        return next(createSuccess(200, "Client Service Agreement updated successfully", agreement));
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
};

// Delete a Client Service Agreement by ID
const deleteAgreement = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agreement = await ClientServiceAgreement.findByIdAndDelete(id);
        if (!agreement) {
            return next(createError(404, "Client Service Agreement not found"));
        }
        return next(createSuccess(200, "Client Service Agreement deleted successfully", agreement));
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
};

module.exports = {
    createAgreement,
    getAllAgreements,
    getAgreement,
    updateAgreement,
    deleteAgreement,
};
