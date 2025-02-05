import PostDao from "../dao/post.Dao.js";

class PostService {
  constructor() {
    this.postDao = new PostDao(); // Instantiate PostDao in the constructor
  }

  async createPost(postData) {
    try {
      const createdPost = await this.postDao.createPost(postData);
      return createdPost;
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  async getPost(postId) {  
    try {
      const post = await this.postDao.getPost(postId);
      return post;
    } catch (error) {
      throw new Error(`Error getting post: ${error.message}`);
    }
  }

  async getAllPost() {
    try {
      const posts = await this.postDao.getAllPost();
      return posts;
    } catch (error) {
      throw new Error(`Error getting posts: ${error.message}`);
    }
  }

  async updatePost(postId, updateData) {
    try {
      const updatedPost = await this.postDao.updatePost(postId, updateData);
      return updatedPost;
    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }

  async deletePost(postId) {
    try {
      const deletedPost = await this.postDao.deletePost(postId);
      return deletedPost;
    } catch (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}

export default PostService;