const mongoose = require("mongoose")
 
const mediaSchema = new mongoose.Schema({

    priceSet : {
      type : mongoose.Decimal128,
      required : true , 
    }, 
    mediaUrl : {
      type : String , 
      required : true,
      unique : true,
    },
    ThumbnailsPath : {
      type : String , 
    },
    uuid : {
      type :String , 
      required : true,
      unique : true,
    },
    mediaPath : {
      type : String , 
      required : true,
      unique : true,
    },
    NumberOfMedia : {
      type : Number , 
      required : true,
    },
    fileNames : {
      type : [String] , 
      required : true,
    },
    thumbnailsNames : {
      type : [String] ,  
      required : true,
    },
    views : {
      type : Number ,
      default : 0,
    },
    sales : {
      type : Number , 
      default : 0,
    },
    createdAt : {
      // value must be new Date(0) 
      type : Date,
      required : true,
    },
    DataType : {
      type: String,
      enum : ['media','file'],
      required : true,
      // need to be required next 
    },
    user : {
      type : mongoose.SchemaTypes.ObjectId ,
      ref : 'User' , 
      required  : true , 
    },
    expired : {
      type : Boolean , 
      default : false , 
    },
    
})


const Media = mongoose.model('Media', mediaSchema);

module.exports = Media 