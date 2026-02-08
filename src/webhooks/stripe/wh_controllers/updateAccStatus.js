const User = require("../../../models/user.model")
const Verification = require("../../../models/verification.model")
 

const updateStripeAccountStatus = async( person )=> {

  try {  
    
    const accountId = person.account
    const status = person.verification.status
    const user = await User.findOne({stripeAccountId : accountId})
   if (status == "pending" || status == "verified") {
      await User.findOneAndUpdate(
        {stripeAccountId : accountId} ,
        {
          StripeAccountStatus : status
        }
      )
    }
    else if (user.StripeAccountStatus == "pending" && status == "unverified"){
      await User.findOneAndUpdate(
        {stripeAccountId : accountId} ,
        {
          StripeAccountStatus : null
        }
      )
      await Verification.findOneAndUpdate(
        {
          user : user.id
        },
        {
          status : "rejected"
        }
      )
    }
  
    console.log("successful update for a person in stripe ...")

 
    }
    catch(e) {
      console.log(`a acc with ID :${accountId} DIDNT UPDATE  with the new account status DURRING THE HOOK EVENT !`)
    }
    
}

module.exports = updateStripeAccountStatus