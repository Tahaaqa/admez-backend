const express = require ("express") 
const {  getMediaDetails   , getAllUserMedia , expireLink} = require("../controllers/media.controller.js")
const router = express.Router() 
const authorize = require("../utils/authorization.js")
 

//USED ...
router.get("/one/:id" , authorize , getMediaDetails)

//USED ...
router.get("/all" , authorize , getAllUserMedia)

//USED ...
router.get("/expire/:id" , authorize , expireLink)




module.exports = router