const express = require("express");
const dotenv = require("dotenv");
const connection = require("./db");
const UserRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post.routes");
const CommentRouter = require("./routes/comment.routes");
const cors=require("cors")
dotenv.config();
const app = express();
app.use(cors({
  origin:["http://localhost:5174","http://localhost:5173","http://localhost:5175"],
  credentials:true
}))
app.use(cookieParser());
app.use(express.json());

app.use("/user", UserRouter);
app.use("/post", postRouter);
app.use("/comment", CommentRouter);

app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log(`server is running on port ${process.env.PORT || 3000}`);
    console.log("<<<<<connected To DB>>>>>");
  } catch (error) {
    console.log(error);
  }
});





