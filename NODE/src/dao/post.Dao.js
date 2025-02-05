import Post from "../model/post.Model.js";

class PostDao {
  async createPost(postData) {
    try {
      const createdPost = await Post.create(postData);
      return createdPost;
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  async getPost(postId) {
    try {
      const post = await Post.findOne({ _id: postId });
      return post;
    } catch (error) {
      throw new Error(`Error getting post: ${error.message}`);
    }
  }

  async getAllPost() {
    try {
      const posts = await Post.find({ deleted: false });
      return posts;
    } catch (error) {
      throw new Error(`Error getting all posts: ${error.message}`);
    }
  }

  async updatePost(postId, updateData) {
    try {
      const updatedPost = await Post.findOneAndUpdate({ _id: postId }, updateData, { new: true });
      return updatedPost;
    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }

  async deletePost(postId) {
    try {
      const deletedPost = await Post.findOneAndUpdate({ _id: postId }, { deleted: true }, { new: true });
      return deletedPost;
    } catch (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}

export default PostDao;