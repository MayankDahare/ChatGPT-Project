const express = require('express');
const authControllers = require('../controllers/auth.controller');
const router = express.Router();
const { sendOTP } = require("../controllers/otp.controller");




router.post('/register', authControllers.registerUser);
router.post('/login', authControllers.loginUser);
router.post("/send-otp", sendOTP);




module.exports = router;