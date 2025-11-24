const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OTP = require("../models/otp.model");   // <-- ADD THIS LINE

function sendToken(user, res, message) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.status(200).json({
        message,
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });
}

async function registerUser(req, res) {
    const { fullName: { firstName, lastName }, email, password, otp } = req.body;

    // ------------------------------------
    // 🔥 1) OTP CHECK
    // ------------------------------------
    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
        return res.status(400).json({ message: "OTP not found" });
    }

    if (otpDoc.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > otpDoc.expiresAt) {
        return res.status(400).json({ message: "OTP expired" });
    }
    // ------------------------------------
    // 🔥 OTP verification complete
    // ------------------------------------

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName: { firstName, lastName },
        email,
        password: hashedPassword
    });

    // DELETE OTP after successful register
    await OTP.deleteMany({ email });

    sendToken(user, res, "User registered successfully");
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    sendToken(user, res, "User login successful");
}

module.exports = {
    registerUser,
    loginUser
};
