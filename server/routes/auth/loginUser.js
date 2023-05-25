const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const User = require('../../Models/UserSchema.js');

const secretKey = process.env.SECRET_KEY;

const loginUser = async (req, res) => {
    let errorCode = null;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        let { email, password } = req.body;
        email = email.toLowerCase();
        const isUser = await User.findOne({ email }).select('+password');
        if (isUser) {
            const isMatch = await bcrypt.compare(password, isUser.password);
            if (isMatch) {
                const user = {
                    userId: isUser._id,
                    name: isUser.name,
                    email: isUser.email

                };
                const authToken = jwt.sign(
                    user,
                    secretKey,
                );
                const loggedInUser = { id: isUser._id, name: isUser.name, email: isUser.email };
                res.status(200).json({ success: true, authToken, loggedInUser });
            } else {
                errorCode = 403;
                throw new Error("Invalid credentials");
            }
        }
        else {
            errorCode = 403;
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(errorCode || 500).json({ success: false, message: "Internal Server error", error: err.message });
    }
}

module.exports = loginUser;