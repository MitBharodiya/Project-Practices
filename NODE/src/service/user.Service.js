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

  async getUser(userId){
    try {
      const user = await this.userDao.getUser(userId);
      return user;
    } catch (error) {
      throw new Error("Error getting user: " + error.message);
    }
  }

  async getAllUser(limit,offset,search){
    try {
      const user = await this.userDao.getAllUser(limit,offset,search);
      return user;
    } catch (error) {
      throw new Error("Error getting user: " + error.message);
    }
  }

  async updateUser(userId,updateData){
    try {
      const user = await this.userDao.updateUser(userId,updateData);
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(userId){
    try {
      const user = await this.userDao.deleteUser(userId);
      return user;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

export default  UserService;