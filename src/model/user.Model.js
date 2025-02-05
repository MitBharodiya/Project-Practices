import mongoose from "mongoose";

// Create a Schema for the User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Make sure the name is required
    trim: true       // Trim spaces around the name
  },
  email: {
    type: String,
    required: true,
    unique: true,    // Ensure email is unique
    // lowercase: true, // Automatically convert email to lowercase
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  deleted:{    // Add a deleted field to Soft Delete
    type:Boolean,
    default:false
  }
},{
  timestamps:true,
});

// Create a Model from the Schema
const User = mongoose.model('User', userSchema);
export default User;