const mongoose = require("mongoose")
 

const VerificationSchema = new mongoose.Schema({
    sessionId : {
      type : String ,
      required : true ,
      unique : true ,
    },
    date : {
      type : Date , 
      required : true , 
      default : Date.now(),
    },
    status : {
      type : String ,
      required : true ,
    },
    user : {
      type : String ,
      required : true ,
    }
    
})


const Verification = mongoose.model('verification', VerificationSchema);

module.exports = Verification 