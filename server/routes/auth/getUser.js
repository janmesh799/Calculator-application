const User = require('../../Models/UserSchema.js')

const getUser = async (req, res) => {
    let errorCode = null;
    try {
        const userId = req.user.userId;
        const isUserExists = await User.findById(userId);
        if (!isUserExists) {
            errorCode = 404;
            throw new Error("User not found");
        }

        res.status(200).json({ success: true, user: isUserExists });
    } catch (err) {
        res.status(errorCode || 500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = getUser;