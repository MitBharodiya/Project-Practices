import User from "../model/user.model.js";
import axios from "axios";
import config from "../config/config.js";
class otpDao {

  async sendtoUserOtp(mobile) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `Your OTP code is ${otp}`;
    try {
      const isExist =await User.findOne({ mobile });
      if(!isExist){throw new Error("User is Not exists")};

      
      const response = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });
      console.log("OTP sent:", response.sid);
      await User.findOneAndUpdate({ mobile }, { otp });
      // return otp;
    } catch (error) {
        console.error("Error sending OTP:", error);
        return null;
    }
  }
}

export default otpDao;