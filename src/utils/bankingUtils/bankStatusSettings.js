const asyncHandler = require("../../utils/errors/asyncHandler");
const CustomError = require("../../utils/errors/CustomError");
const Bank = require("../../models/bank.model");


const isBankVerified = asyncHandler(async(req, res, next)=> {

      try {
        const bank = req.user.bankId 
 

         
 
        if ( bank == null ) { 
          req.bankSetupRequired = true
          return next()
        } 
        const bankStatusWithId = await Bank.findOne({ bankId: bank }).select("status");
        bankStatus = bankStatusWithId.status.toLowerCase()

        if (  bankStatus == 'new' || bankStatus == 'validated' || bankStatus == 'verified' ) {
          req.bankSetupRequired = false
          return next()
        }
        else {
          req.bankSetupRequired = true
          return next()
        }
     
       
 
      }
      catch (e) {
        return next(new CustomError("Failed checking banking status !",400))
      }


})

module.exports = isBankVerified