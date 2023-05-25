const User = require('../../Models/UserSchema')

const getAllCalculations = async (req, res) => {
    let ErrorCode = null;
    try {
        const userId = req.user.userId;
        const isUserExists = await User.findById(userId);
        if (!isUserExists) {
            ErrorCode = 404;
            throw new Error("User Not found");
        }
        res.status(200).json({ success: true, calculations: isUserExists.calculations });
    } catch (err) {
        res.status(ErrorCode || 500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = getAllCalculations;