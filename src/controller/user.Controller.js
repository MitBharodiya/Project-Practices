import {createSuccess,getSuccess,updateSuccess,returnError,deleteSuccess } from "../helper/response.js";
import UserService from "../service/user.Service.js";

class UserController {
  constructor() {
    this.userService = new UserService(); // Initialize userService here
  }

  createUser = async (req, res) => {
    try {
      const userData = req.body;
      const createdUser = await this.userService.createUser(userData);
      return res.status(201).json(createSuccess("user", createdUser));
    } catch (error) {
      if (error.message.includes("User already exists")) 
      return res.status(400).json(returnError(400, error.message));
      return res.status(500).json(returnError(500, error));
    }
  }

  getUser = async (req, res) => {
    try {
      const userId = req.params.id;
      if(!userId) return res.status(400).json(returnError(400, "User id is required"));
      const user = await this.userService.getUser(userId);
      return res.status(200).json(getSuccess("user", user));
    } catch (error) {
      if(error.message.includes("User not found"))
      return res.status(404).json(returnError(404, error.message));
      return res.status(500).json(returnError(500, error));
    }
  }

  getAllUser = async (req, res) => {
    try {
      let {limit=10,offset=1,search=""} = req.query;
      const users = await this.userService.getAllUser(Number(limit),Number(offset),search=search?search:"");
      return res.status(200).json(getSuccess("users", users));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  }

  updateUser = async(req,res)=>{
    try {
      const userId = req.params.id;
      if(!userId) return res.status(400).json(returnError(400, "User id is required"));
      if(!req.body) return res.status(400).json(returnError(400, "User data is required"));
      const user = await this.userService.updateUser(userId,req.body);
      return res.status(200).json(updateSuccess("user", user));
    } catch (error) {
      if(error.message.includes("User not found"))
      return res.status(404).json(returnError(404, error.message));
      return res.status(500).json(returnError(500, error));
    }
  }

  deleteUser = async(req,res)=>{
    try {
      const userId = req.params.id;
      if(!userId) return res.status(400).json(returnError(400, "User id is required"));
      const user = await this.userService.deleteUser(userId);
      return res.status(200).json(deleteSuccess("user", user));
    } catch (error) {
      if(error.message.includes("User not found"))
      return res.status(404).json(returnError(404, error.message));
      return res.status(500).json(returnError(500, error));
    }
  }
}

export default new UserController();
