const asyncHandler = require("../utils/errors/asyncHandler.js")
const FCM =require("../models/fcmToken.model.js")
 

const fcmRegistration = asyncHandler (async (req ,res , next)=> {
  
  const user = req.user.id;
  const stripeId = req.user.stripeAccountId;

  const fcmToken = req.body.token;

    await FCM.findOneAndUpdate(
      { user: user , 
        stripeId : stripeId ,
      },  
      {                      
        $set: {
          fcmToken :  fcmToken
        }
      },
      {                    
        upsert: true,    
      }
    )
    // console.log("insert token")
    // console.log(user)
    // console.log(stripeId)
    // console.log(fcmToken)
 
      res.status(200).json(
        {
          status : 200 , 
          message : 'success', 
        }
      )
    }
)

const removeToken = asyncHandler (async (req ,res , next)=> {
  
  const user = req.user.id;
  const stripeId = req.user.stripeAccountId;

  const fcmToken = req.body.token;

    await FCM.findOneAndUpdate(
      { user: user , 
        stripeId : stripeId ,
      },  
      {                      
        $set: {
          fcmToken :  null
        }
      },
      {                    
        upsert: true,    
      }
    )
    // console.log("remove token")
    // console.log(user)
    // console.log(stripeId)
    // console.log(fcmToken)
 
      res.status(200).json(
        {
          status : 200 , 
          message : 'success', 
        }
      )
    }
)


module.exports = {fcmRegistration  , removeToken}

 