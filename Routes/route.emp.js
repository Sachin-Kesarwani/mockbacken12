


let express=require("express")
require("dotenv").config()
let {Router}=require("express")
const empmodel = require("../Models/model.emp")

let empRoutes=Router()



empRoutes.get("/",(req,res)=>{
    console.log(new Date())
    res.send({"msg":"Employees"})
})
empRoutes.post("/add",async(req,res)=>{
   let data=req.body
        try {
           let savedata=await empmodel({...data})
           savedata.save()
           res.status(200).send({"msg":"Added Successfully",data:data})
        } catch (error) {
            res.status(400).send({"msg":"SOmethin went wrong"})
        }
})


empRoutes.get("/data",async(req,res)=>{
   let {page}=req.query
   let limit=5
   let skip=0

   if(Math.abs(Number(page))>1){
   
    skip=(Number(page)-1)*limit
   }

   try {
    console.log(page)
   
    let data=await empmodel.find().skip(skip).limit(limit).sort({salary:1})
   
   
  
    res.status(200).send({"msg":"Getting data",data})
   } catch (error) {
    res.status(404).send({"msg":"Something went wrong"})
   }
})





empRoutes.delete("/delete/:id",async(req,res)=>{
    let {id}=req.params
         try {
             await empmodel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"Successfully deleted"})
         } catch (error) {
             res.status(400).send({"msg":"Somethin went wrong"})
         }
 })
 empRoutes.patch("/update/:id",async(req,res)=>{
    let {id}=req.params
    let data=req.body
         try {
             await empmodel.findByIdAndUpdate({_id:id},data)
            res.status(200).send({"msg":"Successfully updatead"})
         } catch (error) {
             res.status(400).send({"msg":"Somethin went wrong"})
         }
 })
 

module.exports =empRoutes