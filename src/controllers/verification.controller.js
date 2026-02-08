const asyncHandler = require("../utils/errors/asyncHandler");
const CustomError = require("../utils/errors/CustomError");
const {
  fetchClientToken,
  createSession,
  getSessionDecision,
} = require("../verification/diditVerif/diditUtils");

const KYCverification = asyncHandler(async (req, res, next) => {
  try {

    //===================  LOGS
      console.log("==== requested kyc verification ====")
      console.log(`with email of ${req.user.email}`) 

    const userId = req.user?.id;
    if (!userId) {
      return next(new CustomError("User ID is required", 400));
    }

    const callbackUrl = 'https://www.admez.fun/verification-done';
 
    const token = await fetchClientToken()
 
    const verification = await createSession(
      token,
      "a3d89208-faa6-41c1-b10b-ba33706c7069",
      callbackUrl,
      userId
    );
    console.log(verification)
 

    res.status(200).json({
      status: 200,
      success: true,
      message: "KYC verification initiated successfully",
      url : verification.url,
    });
  } catch (e) { 
    return next(new CustomError("failed requesting you a KYC" , 400)) ;  
  }
});



module.exports = KYCverification;
