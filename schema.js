const { text } = require('body-parser');
const mongoose = require('mongoose');

const info = new mongoose.Schema({
   plname:String,
   tTwenty:Number,
   Odi:Number,
   Link:String,
   Sr:Number,

});
module.exports.information = mongoose.model("information",info);

