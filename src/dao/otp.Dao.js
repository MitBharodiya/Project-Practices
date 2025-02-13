import User from "../model/user.model.js";
import axios from "axios";
import https from "https";
import config from "../config/config.js";


const agent = new https.Agent({
  rejectUnauthorized: false // Ignore SSL certificate validation errors
});

// class otpDao {
//   async sendtoUserOtp(mobile) {
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const message = `Your OTP code is ${otp}`;
//     try {
//       const isExist =await User.findOne({ mobile });
//       if(!isExist){throw new Error("User is Not exists")};

//       const messagesSMS=`🔹\n\n📢 *Hello Dear,*\n\n✅ Your One-Time Password (OTP) is: *${otp}*\n\n🔒 *Please do not share this OTP with anyone.*\n\n📘 *Empowering Best, Enriching Futures!* 🚀`;

//       let url = `${config.otp.smsapiurl}?apikey=${config.otp.apikey}&route=&sender=${config.otp.sender}&mobileno=${mobile}&text=${messagesSMS}`

//       const response = await axios.post(url,{ httpsAgent: agent });
//       if(!response){
//         throw new Error("Error sending OTP");
//       }
//       // return otp;
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         return null;
//     }
//   }
// }

class otpDao {
  constructor() {
    this.otpLength = 6;
    this.otpExpiry = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Generate a secure OTP
   * @returns {string}
   */
  generateOtp() {
    return crypto.randomInt(100000, 999999).toString();
  }

  /**
   * Send OTP to a user via SMS
   * @param {string} mobile
   * @returns {Promise<{ success: boolean, message: string }>}
   */

  async sendToUserOtp(mobile) {
    if (!mobile) {
      return { success: false, message: "Mobile number is required." };
    }

    try {
      // Check if the user exists
      const user = await User.findOne({ mobile });
      if (!user) {throw new Error("User does not exist.");}

      // Generate OTP
      const otp = this.generateOtp();
      const message = this.formatOtpMessage(otp);

      // Construct API URL
      const smsUrl = `${config.otp.smsapiurl}?apikey=${config.otp.apikey}&sender=${config.otp.sender}&mobileno=${mobile}&text=${encodeURIComponent(message)}`;

      // Send OTP request
      const response = await axios.post(smsUrl, {}, { timeout: 5000 });

      if (!response || response.status !== 200) {throw new Error("Failed to send OTP.");}

      // Save OTP in database (optional)
      await this.storeOtpInDatabase(user.id, otp);

      logger.info(`OTP sent to ${mobile}`);
      return { success: true, message: "OTP sent successfully." };

    } catch (error) {
      logger.error(`Error sending OTP to ${mobile}: ${error.message}`);
      return { success: false, message: error.message };
    }
  }

  /**
   * Format OTP Message
   * @param {string} otp
   * @returns {string}
   */
  formatOtpMessage(otp) {
    return `🔹\n\n📢 *Hello Dear,*\n\n✅ Your One-Time Password (OTP) is: *${otp}*\n\n🔒 *Please do not share this OTP with anyone.*\n\n📘 *Empowering Best, Enriching Futures!* 🚀`;
  }

  async storeOtpInDatabase(userId, otp) {
    // Save OTP in the database with expiry (Implementation depends on DB)
    console.log(`Storing OTP ${otp} for user ${userId}`);
    // Example: await OtpModel.create({ userId, otp, expiresAt: Date.now() + this.otpExpiry });
  }



}
export default otpDao;