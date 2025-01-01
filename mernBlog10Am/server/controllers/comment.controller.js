const CommentModel = require("../models/comment.model");

const CreateComment = async (req, res) => {
  const { userId, postId, content } = req.body;
  if (req.user._id != req.params.userId) {
    return res.status(401).json({
      message: "You are not authorized to create comment on this post",
    });
  }
  if (!userId || !postId || !content) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const comment = await CommentModel.create({ userId, postId, content });
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetPostComment = async (req, res) => {
  try {
    const CommentOnPost = await CommentModel.find({
      postId: req.params.postId,
    });
    if (!CommentOnPost) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const totalComment = await CommentModel.countDocuments({
      postId: req.params.postId,
    });
    res.status(200).json({ CommentOnPost, totalComment });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const EditComment = async (req, res) => {
  if (req.body.userId || req.body.postId) {
    return res
      .status(400)
      .json({ message: "You are not authorized to edit this comment" });
  }
  if (req.user._id != req.params.userId) {
    return res.status(401).json({
      message: "You are not authorized to Edit comment on this post",
    });
  }

  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await CommentModel.findByIdAndUpdate(req.params.commentId, {
      $set: { content: req.body.content },
    });
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const DeleteComment = async (req, res) => {
  if (req.user._id != req.params.userId || !req.user.admin) {
    return res.status(401).json({
      message: "You are not authorized to delete comment on this post",
    });
  }

  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await CommentModel.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GettotalComment = async (req, res) => {
  try {
    const comment = await CommentModel.find()
      .limit(req.query.limit || 5)
      .skip(req.query.skip || 0)
      .sort({ createdAt: -1 });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ comment });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const likes = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const index = comment.likes.indexOf(req.params.userId);

    if (index == -1) {
      comment.likes.push(req.params.userId);
      comment.NumberOfLikes += 1;
    } else {
      comment.likes.splice(index, 1);
      comment.NumberOfLikes -= 1;
    }
    await comment.save();
    res.status(200).json({ message: "Comment liked successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  CreateComment,
  GetPostComment,
  EditComment,
  DeleteComment,
  GettotalComment,
  likes,
};
