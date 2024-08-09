const Verbal = require('../models/verbalModel');
const createError = require('../middleware/error');
const createSuccess = require('../middleware/success');

const verbal = async (req, res, next) => {
    try {
        const { clientName, dob, date, time, order, nurseSignature, nursePrintedName, physicianSignature, physicianPrintedName } = req.body;
        
        console.log("Received data:", req.body);

        const newVerbal = new Verbal({
            clientName,
            dob,
            date,
            time,
            order,
            nurseSign: nurseSignature,  // Adjust key to match the front-end if needed
            patientName: nursePrintedName,
            physicianSign: physicianSignature,
            printedName: physicianPrintedName,
        });

        await newVerbal.save();
        return next(createSuccess(200, "User verbal displayed"));
    } catch (error) {
        console.error("Error saving verbal order:", error);
        return next(createError(500, "Something went wrong"));
    }
};

const getAllVerbals = async (req, res, next) => {
    try {
        const verbals = await Verbal.find();
        return next(createSuccess(200, "Get all verbal details", verbals));
    } catch (error) {
        console.error("Error fetching verbal orders:", error);
        return next(createError(500, "Internal Server Error!"));
    }
};

const updateVerbal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const verbal = await Verbal.findByIdAndUpdate(id, req.body, { new: true });
        if (!verbal) {
            return next(createError(404, "Verbal Not Found"));
        }
        return next(createSuccess(200, "Verbal Details Updated", verbal));
    } catch (error) {
        console.error("Error updating verbal order:", error);
        return next(createError(500, "Internal Server Error!"));
    }
};

const getVerbal = async (req, res, next) => {
    try {
        const verbal = await Verbal.findById(req.params.id);
        if (!verbal) {
            return next(createError(404, "Verbal form Not Found"));
        }
        return next(createSuccess(200, "Single verbal detail", verbal));
    } catch (error) {
        console.error("Error fetching verbal order:", error);
        return next(createError(500, "Internal Server Error!"));
    }
};

const deleteVerbal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const verbal = await Verbal.findByIdAndDelete(id);
        if (!verbal) {
            return next(createError(404, "Verbal form Not Found"));
        }
        return next(createSuccess(200, "Deleted", verbal));
    } catch (error) {
        console.error("Error deleting verbal order:", error);
        return next(createError(500, "Internal Server Error!"));
    }
};

module.exports = {
    verbal,
    getAllVerbals,
    updateVerbal,
    getVerbal,
    deleteVerbal
};
