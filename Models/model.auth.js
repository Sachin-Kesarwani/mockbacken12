

let mongoose=require("mongoose")

let signupSchema=mongoose.Schema({
   email:String,
   password:String,
   
})

let signupmodel=mongoose.model("user",signupSchema)


module.exports=signupmodel