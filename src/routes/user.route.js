const express = require ("express") 
const {loginAndRegister  , refresh_access_token , deleteAccount , ValidateUserToken , forgotPassword , resetPassword} = require("../controllers/user.controller.js")
const router = express.Router() 
const {verifyTokenStartApp} = require("../utils/jwtUtils")
const authorize = require("../utils/authorization.js")

//used
router.post("/login" , loginAndRegister)

//used
router.post("/refresh" , refresh_access_token)

//used
router.post("/validate" , verifyTokenStartApp ,ValidateUserToken)

//used
router.delete("/delete" , authorize ,deleteAccount)


//used
router.post("/forgot-password"  ,forgotPassword)


//used
router.patch("/change-password/:token" ,resetPassword)


module.exports = router 