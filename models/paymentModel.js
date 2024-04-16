const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const payment =new Schema({
    phone : String,
    email : String,
    courseTitle : String,
    price : String,
    razorpay_payment_id : String,
 });
 const Payments = db.model("successful_payments",payment);
 module.exports =Payments;
