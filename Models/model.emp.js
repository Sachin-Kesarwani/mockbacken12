

let mongoose=require("mongoose")


let emplSchema=mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    department:String,
    salry:Number,
    date:String
})


let empmodel=mongoose.model("employee",emplSchema)

module.exports=empmodel