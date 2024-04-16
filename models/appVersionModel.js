const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;

const version =new Schema({
    version : String
 });

 const Versions = db.model("version",version);
module.exports =Versions;
