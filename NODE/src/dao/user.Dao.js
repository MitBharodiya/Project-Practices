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

  async getUser(userId) {
    try {
      const user = await User.findOne({'_id':userId,deleted:false});
      if (!user) { throw new Error("User not found"); }
      return user;
    } catch (error) {
      throw new Error(error.message.includes("User not found") ? error.message : `Error getting user:  ${error.message}`); //return error message error.message);
    }
  }

  async getAllUser(limit, offset, search) {
    try {
      limit = parseInt(limit) || 10;
      offset = parseInt(offset) || 1;
      const skip = (offset-1)*limit;

      const filter = {
        deleted: false, // Ensure soft-deleted users are excluded
        ...(search && {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
          ]
        })
      };


      // Get total count of matching users (for pagination metadata)
      const totalUsers = await User.countDocuments(filter,{deleted:false});

      // Fetch users with pagination
      const users = await User.find(filter).skip(skip).limit(limit);
  
      return {
        toalCount:totalUsers,  // Total matching users (useful for frontend)
        limit,
        offset,
        users
      };
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  async updateUser(userId, updateData) {
    try {
      const user = await User.findOneAndUpdate({'_id':userId,deleted:false}, updateData, { new: true });
      if (!user) { throw new Error("User not found"); }
      return user;
    } catch (error) {
      throw new Error(error.message.includes("User not found") ? error.message : `Error updating user:  ${error.message}`); //return error message error.message);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findOneAndUpdate({'_id':userId,deleted:false}, { deleted: true }, { new: true });
      if (!user) { throw new Error("User not found"); }
      return user;
    } catch (error) {
      throw new Error(error.message.includes("User not found") ? error.message : `Error deleting user:  ${error.message}`); //return error message error.message);
    }
  }
}

export default UserDao;
