const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const childSleep =new Schema({
    phone : String,
    hours: Number,
  timestamp: { type: Date, default: Date.now }
    
    
   
 });
 const ChildSleep  = db.model("sleep",childSleep);
 module.exports =ChildSleep;
