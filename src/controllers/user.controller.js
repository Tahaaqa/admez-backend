const User = require("../models/user.model.js")
const asyncHandler = require("../utils/errors/asyncHandler.js")
const CustomError = require("../utils/errors/CustomError.js")
const {generateAccesToken , generateRefreshToken , verifyRefreshToken} = require("../utils/jwtUtils.js")
const sendEmail = require("../utils/emails/email.js")
const crypto = require("crypto")
const FCM = require("../models/fcmToken.model.js")

const loginAndRegister = asyncHandler (async (req ,res , next)=> {
  
  try  {
  
  console.log(req.body)
  let { email , password } = req.body
  email = email.toLowerCase()
  if(!email || !password) return next(new CustomError("enter your fields!" , 400 )) 
      const user = await User.findOne({email : email});

   var ip = req.headers['x-forwarded-for'] ||
     req.socket.remoteAddress ||
     null;
    
      
    if (!user){
     

      //===================  LOGS
      console.log("==== NEW USER CAME IN ====")
      console.log(`with email of ${email}`)
      console.log(`ip for this user is : ${ip}`)

      const newUser = await User.create(
        {
          email  : email,
          password : password,
        }
      )
 
      const access = generateAccesToken(newUser._id)
      const refresh = generateRefreshToken(newUser._id)

      res.status(200).json(
        {
          status : 200 , 
          message : 'success',
          accessToken : access ,
          refreshToken : refresh,
          user_id : newUser.id,
          user : newUser,
          setupComplete : false ,
        }
      )
    }
 
    if (user){

     //===================  LOGS
      console.log("==== old user re loged in ====")
      console.log(`with email of ${email}`)
      console.log(`ip for this user is : ${ip}`)
 
     if(!(await user.comparePasswords(password))) return next(new CustomError("account does'nt exist !" , 455))
      const access = generateAccesToken(user._id)
      const refresh = generateRefreshToken(user._id)
      res.status(200).json(
        {
          status : 200 , 
          message : 'success',
          accessToken : access ,
          refreshToken : refresh,
          user_id : user._id,
          user : user , 
          setupComplete : user.stripeAccountId == null ? false : true ,
        }
      )
    }
  }
  catch (e) {
    return next(new CustomError("Connection lost! try again later." , 400 )) 
  }
})



const refresh_access_token = asyncHandler (async (req , res, next)=> { 
  const {reftoken} = req.body 
  if(!reftoken)return next(new CustomError('you need to re-login again !'))

  const decoded = verifyRefreshToken(reftoken , next)
  const user = await User.findOne({_id : decoded.id}) 
  if(!user)return next(new CustomError("you need to re-login again !"))

 
  const access_jwt =  generateAccesToken(decoded.id)
 
  res.status(200).json(
    {
      status : 200 , 
      message : 'success',
      access_token : access_jwt ,
      refresh_token : reftoken
    }
  )
})


const ValidateUserToken = asyncHandler(async (req ,res, next )=> { 
  res.status(200).json({
    message: 'Token is valid',
    user: req.user,
    stripeSetup : req.StripeAccount == null ? false : true ,
  });

})


const Media = require("../models/media.model.js")
const Bank = require("../models/bank.model.js")
const Payout = require("../models/payout.model.js")

const deleteAccount = asyncHandler(async (req ,res, next )=> {

    try {

      
      const id = req.user._id
            //===================  LOGS
      console.log("==== aacount deletation request ====")
      console.log(`with email of ${req.user.email}`) 
 
    await User.findOneAndDelete({_id : id })
    await Media.deleteMany({user: id})
    await Bank.deleteMany({user: id})
    await Payout.deleteMany({user: id})
    await FCM.findOneAndDelete({user: id,},)
  

 
    res.status(200).json(
      {
        status : "success",
        statusCode : 200,
        message : "Logged out succesfully"
      }
    )
    }
    catch(e) {
      return next(new CustomError("Failed deleting this account! Contact us for Help" , 400))
    }
})




const forgotPassword = asyncHandler(async (req ,res, next )=> {

      //===================  LOGS
      console.log("==== forgot password action ====")
      console.log(`with email of ${req.body.email}`) 
 
 
    const user = await User.findOne({email : req.body.email})
    if(!user) {
      return next(new CustomError("No user registered with this e-mail adress!" , 400))
    }

    const resetToken = user.createResetPasswordToken();

    await user.save({validateBeforeSave : false })

    const resetUrl =  `https://www.duckie.im/account/change-password/${resetToken}`
    const message =  `we received your password reset request. Please use this link below to change your password\n\n`
    try {
      await sendEmail({
        email : user.email,
        subject : "Reset your Duckie Password",
        message : message ,
        url : resetUrl
      });
      res.status(200).json({
        status: 'success',
        success : true,
        msg : 'password reset mail has been sent'
      })
    }
    catch(err) {
      user.passwordResetToken = undefined ;
      user.passwordResetTokenExpires = undefined    
      await user.save({validateBeforeSave : false})

      return next(new CustomError("There was an error trying to send password reset email! Please try again Later. ", 400))
    }


})


const resetPassword = asyncHandler(async (req ,res, next )=> {   
    const  token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({passwordResetToken :  token , passwordResetTokenExpires : {$gt : Date.now()}})
 

    if (!user) {
      return next(new CustomError('Token is invalid or expired!',400))
    }

    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined 
    
    await user.save()

    res.status(200).json({
      status: 'success',
      message : 'password has been changed'
    })


})




module.exports = { loginAndRegister ,refresh_access_token  ,deleteAccount  , ValidateUserToken , forgotPassword , resetPassword}