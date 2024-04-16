const mongoose = require('mongoose')
const db =require('../config/db')
const Schema = mongoose.Schema;
const milestone =new Schema({
    phone : String,
    type: {
        type: String,
        required: true,
        enum: ['physical', 'cognitive', 'social'],
      },
      count: {
        type: Number,
        required: true,
        default: 0,
      },
 });
 const Milestones = db.model("milestones",milestone);
 module.exports =Milestones;
