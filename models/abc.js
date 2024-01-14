const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
    image:String,
    name:String,
    author:String,
    description:String,
    page:Number,
    publication:String,
    prize:Number,
    year:String
})

module.exports = mongoose.model("book",bookModel);