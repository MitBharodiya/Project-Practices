import UserDao from "../dao/user.Dao.js";
import cacheManager from "../utils/cacheManager.js";

class UserService {
  constructor() {
    this.userDao = new UserDao(); // Instantiate UserDao in the constructor
    this.cacheManager =new cacheManager();
  }

  // Create a new user
  async createUser(userData) {
    try {
      const createdUser = await this.userDao.createUser(userData);
      if(createdUser){await this.cacheManager.setCache(`user:${createdUser._id}`,createdUser);}
      return createdUser;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async getUser(userId){
    try {
      const cachekey = `user:${userId}`;
      const cacheUser = await this.cacheManager.getCache(cachekey);
      if (cacheUser) return cacheUser;

      const user = await this.userDao.getUser(userId);
      if(user)await this.cacheManager.setCache(cachekey,user);
      return user;
    } catch (error) {
      throw new Error("Error getting user: " + error.message);
    }
  }

  async getAllUser(limit,offset,search){
    try {
      const cacheKey = `users:limit=${limit}&offset=${offset}&search=${search || ""}`;
      const cachedUsers = await this.cacheManager.getCache(cacheKey);
      if (cachedUsers) return cachedUsers;
      
      const user = await this.userDao.getAllUser(limit,offset,search);
      if(user)await this.cacheManager.setCache(cacheKey,user);
      return user;
    } catch (error) {
      throw new Error("Error getting user: " + error.message);
    }
  }

  async updateUser(userId,updateData){
    try {
      const user = await this.userDao.updateUser(userId,updateData);
      if(user)await this.cacheManager.deleteCache(`user:${userId}`);
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(userId){
    try {
      const user = await this.userDao.deleteUser(userId);
      if(user)await this.cacheManager.deleteCache(`user:${userId}`);
      return user;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

export default  UserService;