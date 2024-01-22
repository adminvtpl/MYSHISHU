
const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const Profile =new Schema({
    phone :{
        type : String,
        required : true,
        unique : true
    },
    name : String,
    profession : String,
    dob : String,
    titleline : String,
    about : String,
    img : {
        type : String,
        default : ""
    }

} ,{
    timestamp : true
});

const userModel = db.model("Profile",Profile);
module.exports =userModel;