const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const image =new Schema({
    phone : String,
    imgLink : String,
    date : String ,
    time : String,
downloadLink : String,
 });
 const saveImag = db.model("saveImages",image);
 module.exports =saveImag;
