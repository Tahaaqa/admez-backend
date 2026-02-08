const express = require ("express")  
const router = express.Router()  
const authorize = require("../utils/authorization.js")
const KYCverification = require("../controllers/verification.controller.js")
const checkBan = require("../utils/isBanned/isBanned.js")

//used
router.get("/verif" , authorize , checkBan , KYCverification )


module.exports = router
