


require("dotenv").config()


var jwt = require('jsonwebtoken');
function authentication(req,res,next){
    let token=req.headers.authorization

    jwt.verify(token, process.env.secret, function(err, decoded) {
      
       if(decoded){
        next()
       }else{
        res.status(404).send({"msg":"Not Found"})
       }
      });
     
}

module.exports=authentication