import mongoose from "mongoose";

// Create a Schema for the User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Make sure the name is required
    trim: true       // Trim spaces around the name
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    // required: true,
  },
  mobile:{
    type: String,
    trim: true
    // required: true,
    // unique: true,
  },
  email: {
    type: String,
    trim: true
    // unique: true,    // Ensure email is unique
    // required: true,
    // lowercase: true, // Automatically convert email to lowercase
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedBy:{
    type: String,
    enum: ['email', 'phone'],
    default: null
  },
  otp: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  ative: {
    type: Boolean,
    default: true,
  },
  deleted:{
    type:Boolean,
    default:false
  }
},{
  timestamps:true,
});

// Create a Model from the Schema
const User = mongoose.model('User', userSchema);
export default User;