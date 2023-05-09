let express=require("express")
const connection=require("./connection")
require("dotenv").config()
let userRouter=require("./Routes/route.auth")
let app= express()
let cors=require("cors")
let empRouter=require("./Routes/route.emp")
const authentication = require("./Middleware/Authentication")
const userModel = require("../../../../../unit-6/sprint-4/evaluation/backend/models/users.model")
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
res.send({"msg":"MOCK 12"})
})
 app.use("/users",userRouter)

app.use("/employee",authentication,empRouter)


app.listen(process.env.port,async()=>{
   try {
    await connection
    console.log("seerver connected to database")
   } catch (error) {
    console.log("error in connection")
   }
   console.log("server ids running at port ",process.env.port)
})