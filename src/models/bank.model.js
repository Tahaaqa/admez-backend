const mongoose = require("mongoose")


const bankSchema = new mongoose.Schema({

    bankId: {
      type: String,
      default :null,
    },
    country : {
      type: String,
      default :null,
    },
    last4 : {
      type: String,
      default :null,
    },
    status : {
      type: String,
      default :null,
    },
    bankName : {
      type: String,
      default :null,
    },
    user : {
        type : mongoose.SchemaTypes.ObjectId ,
        ref : 'User' , 
        required  : true , 
      },
    
})


const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank 