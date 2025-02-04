import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
    required: true
  },
  comment: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment",
    required: true
  },
  user: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;