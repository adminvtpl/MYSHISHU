const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const BlogPost =new Schema({
   phone : String,
   title : String,
   body : String ,
   coverImage :{
    type : String,
    default : "",
   },
   like : {
    type : Number,
    
   },
   share : {
    type : Number,
  
   },
   comment :{
    type : Number,
    default : 0,
   },
});

const BlogPosts = db.model("BlogPost",BlogPost);
module.exports =BlogPosts;
