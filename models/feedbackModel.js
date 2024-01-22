const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const feedbackPost =new Schema({
    phone : String,
    feedback : String,
 });
 const FPosts = db.model("Feedbacks",feedbackPost);
 module.exports =FPosts;