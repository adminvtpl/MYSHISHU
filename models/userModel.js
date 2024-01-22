const mongoose = require('mongoose')
const db = require('../config/db')
const Schema = mongoose.Schema;
const userSchema =new Schema({
    name :{
        type : String,
        required : true,

       },
    email :{
     type : String,
     required : true,
     unique : true
     
    },
    phone :{
        type : String,
        required : true,
        unique : true
        
       },
    password :{
        type : String,
        required : true
    },
    interest :{
        type : String,
        required : true
    },
});
const userModel = db.model('user',userSchema);
module.exports =userModel;