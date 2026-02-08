const CustomError = require("./errors/CustomError")
const asyncHandler = require("./errors/asyncHandler")
const {verifyAccessToken} = require("./jwtUtils")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authorize = asyncHandler( async (req , res , next )=> {
  try {  
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer "))return next(new CustomError(null , 450))
    
    const token = authHeader.split(" ")[1]
    if (!token)return next(new CustomError(new CustomError(null , 450)))
 
    try {
      var decoded = verifyAccessToken(token , next) 
      if (!decoded)return next(new CustomError("invalid user token",450))
    }
    catch(e) {
      return next(new CustomError("Failed allowing authorization" ,450))
    }
    const user = await User.findOne({_id : decoded.id}) 
    if(!user) return next(new CustomError(new CustomError(null , 450)))
    
    console.log(user.email)
    req.user = user  
    next()
  }catch(e){
    return next(new CustomError(new CustomError(null , 450)))
  }

})

module.exports = authorize