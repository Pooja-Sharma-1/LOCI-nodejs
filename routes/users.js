const mongoose=require('mongoose')
const plm=require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/LOCI")

const userSchema=mongoose.Schema({
  username:String,
  mobileNo:Number,
  email:String,
  passsword:String

})

userSchema.plugin(plm)
module.exports=mongoose.model("user",userSchema)