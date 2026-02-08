 const asyncHandler = require("../../utils/errors/asyncHandler");
 const CustomError = require("../../utils/errors/CustomError");
 const User = require("../../models/user.model");
 
 
 const hasPhoneNumber = asyncHandler(async(req, res, next)=> {
 
       try {
         const phone = req.user.phone 
  
 
          
  
         if ( phone == null || !phone ) { 
           req.hasPhoneNumber = false
           return next()
         } 
         else {
           req.hasPhoneNumber = true
           return next()
            
         }
        
        
  
       }
       catch (e) {
         return next(new CustomError("Phone number is required !",400))
       }
 
 
 })
 
 module.exports = hasPhoneNumber