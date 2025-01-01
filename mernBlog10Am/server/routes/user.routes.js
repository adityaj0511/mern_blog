const express = require("express");
const { Sinup, verification, singin,logout,getuser, update, getusers, deleteuserbyadmine } = require("../controllers/user.controller");
const isAuth = require("../middlewares/auth");
const upload = require("../utlis/multer");
const CheckRole = require("../middlewares/role");

const UserRouter = express.Router();

UserRouter.post("/sing-up", Sinup);
UserRouter.post("/verification", verification);
UserRouter.post("/sign-in", singin);
UserRouter.get("/logout", logout);

UserRouter.get("/getuser/:userId",isAuth,getuser)
UserRouter.patch("/update/:userId",isAuth,upload.single("profileImage"),update)


//#### Admine Routes ####
UserRouter.get("/getusers",isAuth,CheckRole,getusers)
UserRouter.delete("/delete/:userId",isAuth,CheckRole,deleteuserbyadmine)



module.exports = UserRouter;
