const mongoose = require('mongoose')
const db = require('../config/db')
const Schema = mongoose.Schema;
const toDoList =new Schema({
    
    phone :{
        type : String,
        
       },
    title :{
        type : String,
       
    },
    desc :{
        type : String,
      
    },
});
const list = db.model('todo',toDoList);
module.exports =list;