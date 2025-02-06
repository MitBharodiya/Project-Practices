import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  },
  caption: {
    type: String,
    maxlength: 2200 // Instagram's max caption length
  },
  media: [{
    type: String, // URL of images/videos
    required: true
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Users who liked the post
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' // Reference to Comment model
  }],
  location: {
    type: String
  },
  tags: [{
    type: String
  }],
  mentions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Users mentioned in the post
  }],
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Post = mongoose.model("Post", postSchema);
export default Post;