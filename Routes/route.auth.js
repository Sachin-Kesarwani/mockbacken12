let express=require("express")
require("dotenv").config()
let {Router}=require("express")
const signupmodel = require("../Models/model.auth")
var bcrypt = require('bcryptjs');
let userRoutes=Router()
var jwt = require('jsonwebtoken');

userRoutes.get("/",(req,res)=>{
    res.send({"msg":"user"})
})

userRoutes.post("/register",(req,res)=>{
    let data=req.body
    if(data.password!==data.Cpassword){
      return  res.status(400).send({"msg":"Check password"})
    }
    try {
        delete data.Cpassword
        bcrypt.hash(data.password, 8, function(err, hash) {
            let savedata=new signupmodel({...data,password:hash})
            savedata.save()
            res.status(200).send({"msg":"Successfully Signup"})
        });
       
    } catch (error) {
        res.status(400).send({"msg":"Error"})
    }
})

userRoutes.post("/login",async(req,res)=>{
    let data=req.body
    try {
        let storedata=await signupmodel.findOne({email:data.email})
      
        if( storedata){
            bcrypt.compare(data.password,storedata.password, function(err, resp) {
                console.log(resp)
               if(resp){
                var token = jwt.sign({ userid: storedata._id}, process.env.secret);
                 res.status(200).send({"msg":"Successfully Login",token})
               }else{
                 res.status(404).send({"msg":"Not found"})
               }
             });
        }
      
    } catch (error) {
        res.status(400).send({"msg":"Something went wrong"})
    }
})



module.exports=userRoutes