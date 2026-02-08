const asyncHandler = require("../utils/errors/asyncHandler.js")
 

const isKycDone = asyncHandler (async (req ,res , next)=> {
 
 
      res.status(200).json(
        {
          status : 200 , 
          message : 'success',
          isRequired : req.kycOnboardRequired,

        }
      )
    }
)


module.exports = isKycDone


 