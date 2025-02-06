import { createSuccess,getSuccess,returnSuccess, returnError,updateSuccess } from "../helper/response.js";
import CommentService from "../service/comment.Service.js";

class CommentController {
  constructor() {
    this.commentService = new CommentService(); // Instantiate CommentService in the constructor
  }

  createComment = async (req, res) => {
    try {
      const commentData = req.body;
      const createdComment = await this.commentService.createComment(commentData);
      return res.status(201).json(createSuccess("comment", createdComment));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  }

  getComment = async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await this.commentService.getComment(commentId);
      return res.status(200).json(getSuccess("comment", comment));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  }

  getAllComment = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const comments = await this.commentService.getAllComment(offset, limit);
      return res.status(200).json(getSuccess("comments", comments));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  }

  getPostComments = async (req, res) => {
    try {
      const postId = req.params.id;
      const comments = await this.commentService.getPostComments(postId);
      return res.status(200).json(returnSuccess("comments", comments));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  }

  deleteComment = async (req, res) => {
    try {
      const commentId = req.params.id;
      const deletedComment = await this.commentService.deleteComment(commentId);
      return res.status(200).json(returnSuccess("comment", deletedComment));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  }

  updateComment = async (req, res) => {
    try {
      const commentId = req.params.id;
      const commentData = req.body;
      const updatedComment = await this.commentService.updateComment(commentId, commentData);
      return res.status(200).json(updateSuccess("comment", updatedComment));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  }
}

export default new CommentController();