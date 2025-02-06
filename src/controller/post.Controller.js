import { createSuccess,getSuccess,returnSuccess,updateSuccess, returnError } from "../helper/response.js";
import PostService from "../service/post.Service.js";

class PostController {
  constructor() {
    this.postService = new PostService(); // Instantiate PostService in the constructor
  }

  createPost = async (req, res) => {
    try {
      const postData = req.body;
      const createdPost = await this.postService.createPost(postData);
      return res.status(201).json(createSuccess("post", createdPost));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  };

  getPost = async (req, res) => {
    try {
      const postId = req.params.id;
      if(postId) {return res.status(400).json(returnError(400, "Post id is required"));}
      const post = await this.postService.getPost(postId);
      return res.status(200).json(getSuccess("post", post));
    } catch (error) {
      if(error.message.includes("Post not found"))
        return res.status(404).json(returnError(404, error.message));
        return res.status(500).json(returnError(500, error));
    }
  };

  getAllPost = async (req, res) => {
    const {offset, limit} = req.query;
    try {
      const posts = await this.postService.getAllPost(offset, limit);
      return res.status(200).json(getSuccess("posts", posts));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  };

  updatePost = async (req, res) => {
    try {
      const postId = req.params.id;
      const updateData = req.body;
      if(!postId) {return res.status(400).json(returnError(400, "Post id is required"));}
      if(!updateData) {return res.status(400).json(returnError(400, "Post Update Info is required"));}
      const updatedPost = await this.postService.updatePost(postId, updateData);
      return res.status(200).json(updateSuccess("post", updatedPost));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  };

  deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
      if(!postId) {return res.status(400).json(returnError(400, "Post id is required"));}
      const deletedPost = await this.postService.deletePost(postId);
      return res.status(200).json(returnSuccess("post", deletedPost));
    } catch (error) {
      if(error.message.includes("Post not found"))
        return res.status(404).json(returnError(404, error.message));
        return res.status(500).json(returnError(500, error));
    }
  }
}

export default new PostController();