const mongoose = require("mongoose")
const CustomError = require("../utils/errors/CustomError")


const payoutSchema = new mongoose.Schema({
    amount : {
      type : Number,
      required : true ,
    },
    date : {
      type : Date , 
      required : true , 
      default : Date.now(),
    },
    arriveBy : {
      type : Date , 
      required : true , 
    },
    status : {
      type : String ,
      required : true ,
    },
    payoutId : {
      type : String ,
      required : true ,
      unique : true ,
    },
    user : {
      type : String ,
      required : true ,
    }
    
})


const Payout = mongoose.model('Payout', payoutSchema);

module.exports = Payout 