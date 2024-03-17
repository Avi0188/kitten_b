 const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
 const auth = async(req,res,next)=>{
try {
    const token= req.headers.authorization
    if(!token){
        return res.status(403).send("No token found")
    }
    const decode = jwt.verify(token, "masai");
    const user = await userModel.findOne({_id:decode.userId})
   req.user= user
   req.userId=decode.userId
//    console.log(user)
    next()

} catch (error) {
   res.send(error)
}
 }

 module.exports = auth