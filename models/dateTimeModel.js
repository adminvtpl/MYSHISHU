const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;

const datetime =new Schema({
    
    blogid : String,
    date : String ,
    time : String 
    
 });
 
 const dt = db.model("BlogCreationTime",datetime);
 module.exports =dt;
