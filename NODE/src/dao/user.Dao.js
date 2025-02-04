import User from "../model/user.model.js";

class UserDao {
  // Create a new user
  async createUser(userData) {
    try {
      //check if user already exist
      const isExist = await User.findOne({ email: userData.email });
      if (isExist) { throw new Error("User already exists"); }

      //create new user
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error(error.message == "User already exists" ? error.message : `Error creating user:  ${error.message}`); //return error message error.message);
    }
  }
}

export default UserDao;
