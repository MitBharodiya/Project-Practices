import UserDao from "../dao/user.Dao.js";

class UserService {
  constructor() {
    this.userDao = new UserDao(); // Instantiate UserDao in the constructor
  }

  // Create a new user
  async createUser(userData) {
    try {
      const createdUser = await this.userDao.createUser(userData);
      return createdUser;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }
}

export default  UserService;