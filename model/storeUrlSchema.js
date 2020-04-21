const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode : String,
    long : String,
    short : String,
    date : {type : String, default : Date.now}
})

module.exports = mongoose.model('Url', urlSchema);