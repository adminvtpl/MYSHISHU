const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const emergency =new Schema({
    phone : String,
    name: String,
    phoneNumber: String,
 });
 const emergencyPage = db.model("Emergency_contacts",emergency);
 module.exports =emergencyPage;
