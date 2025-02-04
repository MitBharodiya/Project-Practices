import {returnSuccess, returnError } from "../helper/response.js";
import UserService from "../service/user.Service.js";

class UserController {
  constructor() {
    this.userService = new UserService(); // Initialize userService here
  }

  createUser =async (req, res)=> {
    try {
      const userData = req.body;
      const createdUser = await this.userService.createUser(userData);
      return res.status(201).json(returnSuccess("user",createdUser));
    } catch (error) {
      if(error.message.includes("User already exists")) return res.status(400).json(returnError(400,error.message));
      return res.status(500).json(returnError(500,error));
    }
  }
}

export default new UserController();
