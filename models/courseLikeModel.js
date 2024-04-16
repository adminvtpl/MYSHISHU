const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const courselikePost =new Schema({
    phone : String,
    likeid : String,
    title : String,
    description: String,
     im : String, 
     pm : String,
      ls: String, 
      price: String, 
      diff: String, 
      dub: String,
      link : String
      
 });
 const courseLike = db.model("courseWishlist",courselikePost);
 module.exports =courseLike;
