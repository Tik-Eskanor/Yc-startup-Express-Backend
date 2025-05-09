const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
   id:String,
   name:String,
   userName:String,
   email:String,
   image:String,
   bio:String
})

module.exports = mongoose.model('Author',AuthorSchema)