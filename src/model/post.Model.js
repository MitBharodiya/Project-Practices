import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Like"
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Post = mongoose.model("Post", postSchema);
export default Post;
