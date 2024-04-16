const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const medical =new Schema({
    phone : String,
    allergies: [String],
    medications: [String],
 });
 const MedicalInfo = db.model("medical_Info",medical);
 module.exports =MedicalInfo;
