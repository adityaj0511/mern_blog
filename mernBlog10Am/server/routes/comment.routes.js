const express = require("express");
const { CreateComment, GetPostComment, EditComment, DeleteComment, GettotalComment, likes } = require("../controllers/comment.controller");

const isAuth = require("../middlewares/auth");
const CheckRole = require("../middlewares/role");
const CommentRouter = express.Router();

CommentRouter.post("/create/:userId", isAuth, CreateComment);
CommentRouter.get("/getpostcomment/:postId", isAuth, GetPostComment);
CommentRouter.patch("/edit/:commentId/:userId", isAuth, EditComment);
CommentRouter.delete("/delete/:commentId/:userId", isAuth, DeleteComment);
CommentRouter.get("/get-total-comment", isAuth, CheckRole,GettotalComment);
CommentRouter.patch("/like/:commentId/:userId", isAuth,likes);

module.exports = CommentRouter;
