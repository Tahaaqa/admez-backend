const asyncHandler = require("../utils/errors/asyncHandler.js")
const CustomError = require("../utils/errors/CustomError.js")
const Bank = require("../models/bank.model.js")
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


 
const getBank = asyncHandler(async (req, res, next) => {
 
  const user = req.user;

  try {
    if (user.bankId != null) {
      const bank = await Bank.findOne({
        bankId: user.bankId,
      }); 

      try {
        const externalAccount = await stripe.accounts.retrieveExternalAccount(
          user.stripeAccountId,
          user.bankId
        ); 
      } catch (stripeError) {
        return next(new CustomError("Failed getting your banking Details, you should try again later !", 400));
      }

     
      return res.status(200).json({
        status: 200,
        success: true,
        bank: bank,
        country : user.country
      });
    }

 
    res.status(200).json({
      status: 200,
      success: true,
      bank: null,
      country : user.country
    });
  } catch (e) {
  
    return next(new CustomError("Failed getting your banking Details, you should try later !", 400));
  }
});

module.exports = getBank

