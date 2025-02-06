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
      const post = await Post.findOne({ _id: postId , deleted: false });
      if (!post) { throw new Error("Post not found"); }
      return post;
    } catch (error) {
      throw new Error(error.message.includes("Post not found") ? error.message : `Error getting post: ${error.message}`);
    }
  }

  async getAllPost(offset, limit) {
    try {
      limit = parseInt(limit) || 10;
      offset = parseInt(offset) || 1;
      const skip = (offset - 1) * limit;

      const posts = await Post.find({ deleted: false }).skip(skip).limit(limit).sort({ createdAt: -1 });
      const totalCount = await Post.countDocuments({ deleted: false });
      return {
        data: posts,
        pagination: {
            totalCount: totalCount,
            limit,
            offset,
            totalPages: Math.ceil(totalCount / limit),
            hasNextPage: skip + limit < totalCount,
            hasPrevPage: offset > 1
        }
    };
    } catch (error) {
      throw new Error(`Error getting all posts: ${error.message}`);
    }
  }

  async updatePost(postId, updateData) {
    try {
      const updatedPost = await Post.findOneAndUpdate({ _id: postId ,deleted:false}, updateData, { new: true });
      return updatedPost;
    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }

  async deletePost(postId) {
    try {
      const deletedPost = await Post.findOneAndUpdate({ _id: postId }, { deleted: true }, { new: true });
      if (!deletedPost) { throw new Error("Post not found"); }
      return deletedPost;
    } catch (error) {
      throw new Error(error.message.includes("Post not found") ? error.message : `Error getting post: ${error.message}`);
    }
  }
}

export default PostDao;