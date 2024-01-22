const mongoose = require('mongoose');
const connection  = mongoose.createConnection('mongodb+srv://anuragtandon54321:anu1122gamer@cluster0.htkbsue.mongodb.net/myshishu').on('open',()=>{
    console.log("MongoDb connected");
}).on('error',()=>{
    console.log("Mongo error");
})
module.exports =connection;