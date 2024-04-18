const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const childAge =new Schema({
    phone : String,
    childName : String,
    DateOfBirth : String,
    coverImage :{
        type : String,
        default : "",
       },
    
      
 });
 const ChildAge = db.model("childs",childAge);
 module.exports =ChildAge;
