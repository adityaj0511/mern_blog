const express=require("express")
const isAuth = require("../middlewares/auth")
const CheckRole = require("../middlewares/role")
const { CreatePost,DeletePost, UpdatePost, getPosts} = require("../controllers/post.controller")
const upload = require("../utlis/multer")


const postRouter=express.Router()


postRouter.post("/create",isAuth,CheckRole,CreatePost)


postRouter.delete("/delete/:postId/:userId",isAuth,CheckRole,DeletePost)
postRouter.patch("/update/:postId/:userId",isAuth,CheckRole,upload.single("blogImage"),UpdatePost)

postRouter.get("/getpost",isAuth,getPosts)




module.exports=postRouter