const User = require("../../Models/UserSchema")
const deleteAllCalculations = async (req, res) => {
    let errorCode = null;
    try {
        const userId = req.user.userId;
        let user = await User.findById(userId);
        if (!user) {
            errorCode = 404;
            throw new Error("User Not found")
        }
        user.calculations.splice(0, user.calculations.length);
        user.save().then(() => {
            res.status(200).json({ success: true, message: "All calculations deleted" })
        }).catch(err => {
            console.log(err.message)
            throw new Error("unable to delete all calculations");
        })
    } catch (err) {
        res.status(errorCode || 500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}
module.exports = deleteAllCalculations;