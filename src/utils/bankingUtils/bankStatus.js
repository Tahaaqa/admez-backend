const asyncHandler = require("../errors/asyncHandler");
const CustomError = require("../errors/CustomError");
const Bank = require("../../models/bank.model");


const checkBankStatus = asyncHandler(async (req ,res , next)=> {
    try{
    const BankId = req.user.bankId
    if(!BankId || BankId == null) return next( new CustomError("You should provide a Bank Account to do this action !",400))
    
      const bankAcc = await Bank.findOne({ bankId: BankId }).select("status");
 
      if (bankAcc.status.toLowerCase().trim() === "verification_failed" || bankAcc.status.toLowerCase().trim() === "errored"  ){
        
        return next( new CustomError(`Provide a new bank account! the account you provided has status ${bankAcc.status}`,400))
      }

    next()
    }
    catch (e)
    { 
      return next( new CustomError("Failed checking Bank Status, You should try again later!",400))
    }
})


module.exports = checkBankStatus