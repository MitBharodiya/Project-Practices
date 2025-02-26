import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  },
  user: {
    type: "string",
    ref: 'User'
  },
});

const Like = mongoose.model("Like", likeSchema);
export default Like;