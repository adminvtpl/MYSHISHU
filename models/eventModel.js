const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const event =new Schema({
    phone : String,
    eventTitle: String,
    eventDescp: String,
    date: String,
 });
 const EventPage = db.model("events",event);
 module.exports =EventPage;
