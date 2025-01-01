const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  content:{
    type: String,
    required: true,
  },
  likes:{
    type: Array,
    default:[]
  },
  NumberOfLikes:{
    type:Number,
    default:0
  }
},{
  timestamps: true
});



const CommentModel=mongoose.model("comment",commentSchema)

module.exports=CommentModel