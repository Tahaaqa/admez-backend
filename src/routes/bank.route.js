const express = require ("express") 
const router = express.Router() 
const getBank = require("../controllers/bank.controller.js")
const authorize = require("../utils/authorization.js")
 
// USED ... 
router.get('/myBank' , authorize     , getBank)

module.exports = router