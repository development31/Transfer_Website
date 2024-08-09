const Digital = require('../models/digitalModel');
const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')


//for post verbal

const digital = async (req, res, next) => {
    try {
        const { client,clientSign, date,financialSign,healthSign } = req.body;
        const newDigital = new Digital({
            client: client,
            clientSign: clientSign,
            date: date,
            financialSign: financialSign,
            healthSign: healthSign,
        })
        await newDigital.save();
        return next(createSuccess(200, "User displayed"))
    }
    catch (error) {
        return next(createError(500, "Something went wrong"))
    }
}
//get all assessment

const getAllDigitals = async (req, res, next) => {
    try {
        const digitals = await Digital.find();
        return next(createSuccess(200, "Get all verbal details ", digitals));

    } catch (error) {
        return next(createError(500, "Internal Server Error!"))
    }
}

//for update

const updateDigital = async (req, res, next) => {
    try {
        const { id } = req.params;
        const digital = await Digital.findByIdAndUpdate(id, req.body);
        if (!digital) {
            return next(createError(404, "verbal Not Found"));
        }
        return next(createSuccess(200, "verbal Details Updated", digital));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
}
//get a single assessment

const getDigital = async (req, res, next) => {
    try {
        const digital = await Digital.findById(req.params.id);
        if (!digital) {
            return next(createError(404, "verbal form Not Found"));
        }
        return next(createSuccess(200, "Single verbal detail", digital));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
}
//delete assessment
const deleteDigital = async (req, res, next) => {
    try {
        const { id } = req.params;
        const digital = await Verbal.findByIdAndDelete(id);
        if (!digital) {
            return next(createError(404, "verbal form Not Found"));
        }
        return next(createSuccess(200, " Deleted", digital));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
}

module.exports = {
    digital,
    getAllDigitals,
    updateDigital,
    getDigital,
    deleteDigital
}