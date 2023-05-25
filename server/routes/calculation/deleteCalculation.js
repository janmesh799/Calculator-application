const Calculation = require("../../Models/CalculationSchema");
const User = require('../../Models/UserSchema.js')

const deleteCalculation = async (req, res) => {
    let errorCode = null;
    try {
        const calculationId = req.headers.calculationid;
        const isCalculationExist = await Calculation.findById(calculationId);
        const user = await User.findById(req.user.userId);
        if (!isCalculationExist) {
            errorCode = 404;
            throw new Error("Calculation not found");
        }
        if (isCalculationExist.owner.toHexString() !== req.user.userId) {
            errorCode = 403;
            throw new Error("Access Denied");
        }
        let filtered_calculations = user.calculations.filter(function (val) { //callback function
            if (val.toHexString() !== calculationId) { //filtering criteria
                return val;
            }
        })
        user.calculations = filtered_calculations;
        await user.save();
        Calculation.findByIdAndDelete(calculationId).then(() => {
            res.status(200).json({ success: true, message: "Calculation deleted successfully" })
        }).catch(err => {
            errorCode = 500;
            throw new Error("Calculation deletion failed");
        })


    } catch (err) {
        res.status(errorCode || 500).json({ success: false, message: "Internal Server error", error: err.message })
    }
}

module.exports = deleteCalculation;