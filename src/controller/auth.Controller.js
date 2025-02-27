import {createSuccess,getSuccess,updateSuccess,returnError,deleteSuccess } from "../helper/response.js";
import logger from "../utils/logger.js";
import AuthService from "../service/auth.Service.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  loginUser = async (req, res) => {
    try {
      const userData = req.body;
      const UserLogin = await this.authService.loginUser(userData);
      logger.info(`User Login: ${UserLogin._id}`);
      return res.status(201).json(createSuccess("user Login", UserLogin));
    } catch (error) {
      if (error.message.includes("User not exists")){
        logger.error(`User not exists: ${error.message}`);
        return res.status(400).json(returnError(400, error.message));
      }
      logger.error(`Error login users: ${error.message}`);
      return res.status(500).json(returnError(500, error));
    }
  }
}

export default new AuthController();