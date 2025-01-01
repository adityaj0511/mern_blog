const PostModel = require("../models/post.model");

const CreatePost = async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  if (req.body.userId) {
    return res.status(400).json({ message: "invalid request" });
  }

  try {
    const post = await PostModel.create({ ...req.body, userId: req.user._id });
    return res.status(200).json({ post, message: "Post created Succesfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const DeletePost = async (req, res) => {
  if (req.user._id != req.params.userId) {
    return res
      .status(400)
      .json({ message: "You are not authorized to delete this post" });
  }

  try {
    const post = await PostModel.findOne({ _id: req.params.postId });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const deletedPost = await PostModel.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Post deleted Succesfully", deletedPost });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const UpdatePost = async (req, res) => {
  const { filename } = req.file;
  if (req.user._id != req.params.userId) {
    return res
      .status(400)
      .json({ message: "You are not authorized to update this post" });
  }

  try {
    const post = await PostModel.findOne({ _id: req.params.postId });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const updatedPost = await PostModel.findByIdAndUpdate(req.params.postId, {
      $set: { ...req.body, blogImage: filename },
    });
    res.status(200).json({ message: "Post updated Succesfully", updatedPost });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json({ posts });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { CreatePost, DeletePost, UpdatePost, getPosts };
