const Calculation = require("../../Models/CalculationSchema");
const User = require("../../Models/UserSchema");

const addCalculation = async (req, res) => {
    let ErrorCode = null;
    try {
        const userId = req.user.userId;
        const isUserExists = await User.findById(userId);
        if (!isUserExists) {
            ErrorCode = 404;
            throw new Error("No user found")
        }
        const calculation = { expression: req.body.expression, result: req.body.result, owner: isUserExists };
        const newCalculation = new Calculation(calculation);
        await newCalculation
            .save()
            .then((calc) => {
                isUserExists.calculations.push(calc);
                isUserExists
                    .save()
                    .then(() => {
                        res.status(200).json({ success: true, message: "Calculation Saved Successfully" });
                    }).catch(err => {
                        throw new Error("Calculation sync with user failed " + err.message);
                    })
            }).catch(err => {
                throw new Error("Caculation saving failed")
            })

    } catch (err) {
        res.status(ErrorCode || 500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = addCalculation;