const express = require ("express") 
const router = express.Router() 
const {fcmRegistration  , removeToken} = require("../controllers/fcm.controller.js")
const authorize = require("../utils/authorization.js")
 
// USED ... 
router.post('/registration' , authorize  , fcmRegistration)
router.delete('/remove' , authorize  , removeToken)

module.exports = router