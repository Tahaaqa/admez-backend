const asyncHandler = require("../utils/errors/asyncHandler.js") 
const User = require("../models/user.model.js")
const Stripe = require('stripe');
 
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PhoneNumberRegistration = asyncHandler (async (req ,res , next)=> {
  
try {
    const id = req.user._id;
  const stripeId = req.user.stripeAccountId;

  const phoneNumber = req.body.phone

  console.log("adding a phone number")

    await User.findOneAndUpdate(
      { _id: id ,  
      },  
      {                      
        $set: {
          phone :  phoneNumber
        }
      }, 
    ) 

    const account = await stripe.accounts.update(
        stripeId,
        {
            individual: {
            phone : phoneNumber,
            },
        }
        );
 
      res.status(200).json(
        {
          status : 200 , 
          message : 'success', 
          phone : phoneNumber
        
        }
      )
    
}
catch(e){
  console.log(e.message)
}
}
)

const getPhoneNumber = asyncHandler (async (req ,res , next)=> {
  
  const id = req.user._id; 
   console.log("get a phone number")

    const user = await User.findOne(
      { _id: id },   
    ).select({
      "phone" : 1 ,  
    })

    console.log(user.phone)
  
 
      res.status(200).json(
        { 
          message : 'success', 
          phone : user.phone
        
        }
      )
    }
)
 


module.exports = { PhoneNumberRegistration  , getPhoneNumber }

 