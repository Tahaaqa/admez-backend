const asyncHandler = require("../../utils/errors/asyncHandler");
const CustomError = require("../../utils/errors/CustomError");
const Verification = require("../../models/verification.model")

const isVerifiedSetting = asyncHandler(async(req, res, next)=> {

      try {

        //console.log("in verification route for settings")
        userId = req.user.id 
        //console.log(userId)
        const verif = await Verification.findOne({user : userId})
        //console.log(verif)
        if ( !verif ) {
          req.kycOnboardRequired = true
          req.status = "no verification yet"
          return next()
        }

        if ( verif.status.toLowerCase() == 'approved' || verif.status.toLowerCase() == 'in review' ) {
          req.kycOnboardRequired = false
          req.status = verif.status
          //console.log(verif.status)
          return next()
        }
        else {
          req.kycOnboardRequired = true
          req.status = verif.status
          return next()
        } 
      }
      catch (e) {
        return next(new CustomError("failed checking verification status !",400))
      }


})

module.exports = isVerifiedSetting