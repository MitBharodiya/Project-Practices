import Comment from "../model/comment.Model.js";
import Post from "../model/post.Model.js";

class CommentDao {
  async createComment(commentData) {
    try {
      const createdComment = await Comment.create(commentData);

    // Update the post by pushing the new comment ID
    const updatedPost = await Post.findByIdAndUpdate(
      commentData.post,
      { $push: { comments: createdComment._id } },  // Use created comment ID
      { new: true }
    ).populate("comments").exec();  // Populate comments for updated post
    return updatedPost;
    } catch (error) {
      throw new Error(`Error creating comment: ${error.message}`);
    }
  }

  async getPostComments(postId) {
    try {
      const comments = await Comment.find({ post: postId });
      return comments;
    } catch (error) {
      throw new Error(`Error getting comments: ${error.message}`);
    }
  }

  async deleteComment(commentId) {
    try {
      const deletedComment = await Comment.findOneAndDelete({ _id: commentId });
      return deletedComment;
    } catch (error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  }

  async updateComment(commentId, updateData) {
    try {
      const updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, updateData, { new: true });
      return updatedComment;
    } catch (error) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  }

  async getComment(commentId) {
    try {
      const comment = await Comment.findById(commentId)
      .populate("user")
      .populate("post")
      .exec();
      return comment;
    } catch (error) {
      throw new Error(`Error getting comment: ${error.message}`);
    }
  }

  async getAllComment(offset, limit) {
    try {
      limit = parseInt(limit) || 10;
      offset = parseInt(offset) || 1;
      const skip = (offset - 1) * limit; 

      const totalComments = await Comment.countDocuments({ deleted: false });
  
      const comments = await Comment.find({ deleted: false })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Sorting newest comments first
  
      return {
        totalComments,
        limit,
        offset,
        totalPages: Math.ceil(totalComments / limit),
        comments
      };
    } catch (error) {
      throw new Error(`Error getting all comments: ${error.message}`);
    }
  }
  
}

export default CommentDao;