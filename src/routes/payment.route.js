const express = require ("express") 
const { createCheckoutSession , successPaymentUrl   } = require("../controllers/payment.controller.js")
const router = express.Router() 


// USED ...
router.post('/create_checkout_session' , createCheckoutSession)

// USED ...
router.get('/success' , successPaymentUrl)
 


module.exports = router