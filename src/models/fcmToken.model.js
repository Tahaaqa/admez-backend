const mongoose = require("mongoose")
 

const fcm = new mongoose.Schema({
    fcmToken : {
      type : String , 
    }, 
    stripeId : {
      type : String ,
      required : true ,
      unique : true
    },
    user : {
      type : String ,
      required : true ,
      unique : true
    }
    
})


const FCM = mongoose.model('fcm', fcm);

module.exports = FCM 