const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const memories =new Schema({
    phone : String,
    title : String,
    description : String,
    date : String,
coverImage :{
        type : String,
        default : "",
       },
 });
 const Memories = db.model("memory",memories);
 module.exports =Memories;
