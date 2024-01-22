const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const likePost =new Schema({
    phone : String,
    likeid : String,
 });
 const LPosts = db.model("likeBlogs",likePost);
 module.exports =LPosts;