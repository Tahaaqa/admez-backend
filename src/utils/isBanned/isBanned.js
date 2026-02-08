const User = require('../../models/user.model'); 
 
const asyncHandler = require('../errors/asyncHandler');
const CustomError = require("../errors/CustomError")
 
const checkBan = asyncHandler(async (req, res, next) => {
  try {
     
    const userId = req.user._id;
 

   
    const user = await User.findById(userId);
 

   
    if (user && user.restricted) {
 
      return next(new CustomError('Your access to this service has been restricted due to a violation of our terms of use. If you believe this is a mistake, please contact support for further assistance' , 400))
     
    }

     
    next();
  } catch (error) { 
    return next(new CustomError('Failed checkiong account status' , 400))
  }
})

module.exports = checkBan;