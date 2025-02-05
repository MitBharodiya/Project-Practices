import { createSuccess,getSuccess,returnSuccess, returnError } from "../helper/response.js";
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
      const post = await this.postService.getPost(postId);
      return res.status(200).json(getSuccess("post", post));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  };

  getAllPost = async (req, res) => {
    try {
      const posts = await this.postService.getAllPost();
      return res.status(200).json(getSuccess("posts", posts));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  };

  updatePost = async (req, res) => {
    try {
      const postId = req.params.id;
      const updateData = req.body;
      const updatedPost = await this.postService.updatePost(postId, updateData);
      return res.status(200).json(returnSuccess("post", updatedPost));
    } catch (error) {
      return res.status(500).json(returnError(500, error));
    }
  };
}

export default new PostController();