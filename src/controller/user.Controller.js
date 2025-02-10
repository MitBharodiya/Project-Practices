import {createSuccess,getSuccess,updateSuccess,returnError,deleteSuccess } from "../helper/response.js";
import logger from "../utils/logger.js";
import UserService from "../service/user.Service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req, res) => {
    try {
      const userData = req.body;
      const createdUser = await this.userService.createUser(userData);
      logger.info(`User created: ${createdUser._id}`);
      return res.status(201).json(createSuccess("user", createdUser));
    } catch (error) {
      if (error.message.includes("User already exists")){
        logger.error(`User already exists: ${error.message}`);
        return res.status(400).json(returnError(400, error.message));
      }
      logger.error(`Error fetching users: ${error.message}`);
      return res.status(500).json(returnError(500, error));
    }
  }

  getUser = async (req, res) => {
    try {
      const userId = req.params.id;
      if(!userId) return res.status(400).json(returnError(400, "User id is required"));
      const user = await this.userService.getUser(userId);
      logger.info(`User fetched: ${user._id}`);
      return res.status(200).json(getSuccess("user", user));
    } catch (error) {
      if(error.message.includes("User not found")){
        logger.error(`User not found: ${error.message}`);
        return res.status(404).json(returnError(404, error.message));
      }
      logger.error(`Error fetching user: ${error.message}`);
      return res.status(500).json(returnError(500, error));
    }
  }

  getAllUser = async (req, res) => {
    try {
      let {limit=10,offset=1,search=""} = req.query;
      const users = await this.userService.getAllUser(Number(limit),Number(offset),search=search?search:"");
      logger.info(`Users fetched: ${users.length,search,offset,limit}`);
      return res.status(200).json(getSuccess("users", users));
    } catch (error) {
      logger.error(`Error fetching users: ${error.message}`);
      return res.status(500).json(returnError(500, error));
    }
  }

  updateUser = async(req,res)=>{
    try {
      const userId = req.params.id;
      if(!userId) return res.status(400).json(returnError(400, "User id is required"));
      if(!req.body) return res.status(400).json(returnError(400, "User data is required"));
      const user = await this.userService.updateUser(userId,req.body);
      logger.info(`User updated: ${user._id}`);
      return res.status(200).json(updateSuccess("user", user));
    } catch (error) {
      if(error.message.includes("User not found")){
      logger.error(`User not found: ${error.message}`);
      return res.status(404).json(returnError(404, error.message));
      }
      logger.error(`Error updating user: ${error.message}`);
      return res.status(500).json(returnError(500, error));
    }
  }

  deleteUser = async(req,res)=>{
    try {
      const userId = req.params.id;
      if(!userId) return res.status(400).json(returnError(400, "User id is required"));
      const user = await this.userService.deleteUser(userId);
      logger.info(`User deleted: ${user._id}`);
      return res.status(200).json(deleteSuccess("user", user));
    } catch (error) {
      if(error.message.includes("User not found")){
        logger.info(`User not found: ${error.message}`);
        return res.status(404).json(returnError(404, error.message));
      }
      logger.error(`Error deleting user: ${error.message}`);
      return res.status(500).json(returnError(500, error));
    }
  }
}

export default new UserController();
