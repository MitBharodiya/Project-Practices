import AuthDao from "../dao/auth.Dao.js";
import cacheManager from "../utils/cacheManager.js";

class AuthService {
  constructor() {
    this.authDao = new AuthDao();
    this.cacheManager =new cacheManager();
  }

  // login a user
  async createUser(userData) {
    try {
      const loginUser = await this.authDao.loginUser(userData);
      return loginUser;
    } catch (error) {
      throw new Error("Error login user: " + error.message);
    }
  }
}