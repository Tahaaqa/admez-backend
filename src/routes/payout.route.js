const express = require ("express") 
const {requestPayout , getAllPayouts , getAllPayoutsForScreen } = require("../controllers/payout.controller.js")
const router = express.Router() 
const authorize = require("../utils/authorization.js")
const checkBankStatus = require("../utils/bankingUtils/bankStatus.js")
const isVerifiedMiddleWare = require("../verification/diditVerif/isVerifiedKyc.js")
const checkBan = require("../utils/isBanned/isBanned.js")

// USED ...
router.post("/r-payout" , authorize , checkBan ,checkBankStatus , isVerifiedMiddleWare   , requestPayout)

// USED ...
router.get("/payouts" , authorize  ,  getAllPayouts)

router.get("/payoutsAll" , authorize  ,  getAllPayoutsForScreen)

module.exports = router