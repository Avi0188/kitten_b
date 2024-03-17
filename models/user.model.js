const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
name:String,
email:String,
password:String,
gameswon:{
    type:Number,
    default:0
}
},
{
    timestamps : true 
})

userModel = mongoose.model("User" , userSchema)

module.exports = userModel
