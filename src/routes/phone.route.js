const express = require ("express") 
const {PhoneNumberRegistration, getPhoneNumber } = require("../controllers/phone.controller.js")
const router = express.Router() 
const authorize = require("../utils/authorization.js") 
const checkBan = require("../utils/isBanned/isBanned.js")

// USED ...
router.post("/phone-submission" , authorize , checkBan   , PhoneNumberRegistration)

// USED ...
router.get("/get-phone" , authorize    , getPhoneNumber)

 

module.exports = router