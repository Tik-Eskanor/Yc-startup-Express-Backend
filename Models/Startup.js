const mongoose = require('mongoose')

const StartupSchema = new mongoose.Schema({
   title:String,
   slug:String,
   author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Author'
   },
   email:String,
   views:Number,
   description:String,
   category:String,
   image:String,
   pitch:String,
},
{ timestamps: true }
)

module.exports = mongoose.model('Startup',StartupSchema)