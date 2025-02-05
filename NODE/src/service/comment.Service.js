import CommentDao from "../dao/comment.Dao.js";

class CommentService {
  constructor() {
    this.commentDao = new CommentDao();
  }

  async createComment(commentData) {
    try {
      const createdComment = await this.commentDao.createComment(commentData);
      return createdComment;
    } catch (error) {
      throw new Error(`Error creating comment: ${error.message}`);
    }
  }
  async getPostComments(postId) {
    try {
      const comments = await  this.commentDao.getPostComments(postId);
      return comments;
    } catch (error) {
      throw new Error(`Error getting comments: ${error.message}`);
    }
  }
  async getAllComment(offset, limit) {
    try {
      const comments = await  this.commentDao.getAllComment(offset, limit);
      return comments;
    } catch (error) {
      throw new Error(`Error getting all comments: ${error.message}`);
    }
  }
  async getComment(commentId) {
    try {
      const comment = await  this.commentDao.getComment(commentId);
      return comment;
    } catch (error) {
      throw new Error(`Error getting comment: ${error.message}`);
    }
  }
  async deleteComment(commentId) {
    try {
      const deletedComment = await  this.commentDao.deleteComment(commentId);
      return deletedComment;
    } catch (error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  }
  async updateComment(commentId, updateData) {
    try {
      const updatedComment = await  this.commentDao.updateComment(commentId, updateData);
      return updatedComment;
    } catch (error) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  }
}

export default CommentService;