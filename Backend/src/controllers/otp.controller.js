const nodemailer = require("nodemailer");
const OTP = require("../models/otp.model");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your Verification OTP",
      text: `Your OTP is: ${otp}`
    });

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
