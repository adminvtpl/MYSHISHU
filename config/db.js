const mongoose = require('mongoose');
const connection  = mongoose.createConnection().on('open',()=>{
    console.log("MongoDb connected");
}).on('error',()=>{
    console.log("Mongo error");
})
module.exports =connection;
