const otpController = require("../controller/otpController");
const express = require("express");
const router = express.Router();
router.post("/otp-login",otpController.otpLogin);
router.post("/otp-verify",otpController.verifyOTP);
router.post("/sendemail",otpController.sendEmail);
router.post("/sendotponmobile",otpController.otpLoginonMobile);
router.post("/verifyotponmobile",otpController.verifyOTPonmobile);
module.exports= router;