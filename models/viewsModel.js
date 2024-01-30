const mongoose = require('mongoose')
const db = require('../config/db')
const Schema = mongoose.Schema;




const viewsSchema =new Schema({
    blogid : String,
    views : {
        type : Number,
       },
});
const viewModel = db.model('Views',viewsSchema);
module.exports =viewModel;
