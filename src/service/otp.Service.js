import otpDao from "../dao/otp.Dao.js";
import { createSuccess, returnError } from "../helper/response.js";
import cacheManager from "../utils/cacheManager.js";
import logger from "../utils/logger.js";

class OtpService {

  constructor(){
    this.otpDao = new otpDao();
    this.cacheManager =new cacheManager();
  }
  
  async sendOtp(mobileNo) {
    try {
      const cachekey = `user:${mobileNo}`;
      const otp = await this.otpDao.sendtoUserOtp(mobileNo);
      // if(otp) {
      //   await this.cacheManager.setCache(cachekey,otp);
      //   logger.info(otp);
      // };
      
    } catch (error) {
      logger.error(error);
      return returnError(500, error);
    }
  }


}

export default OtpService;