const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEB_HOOK;

const updateSales = require("./wh_controllers/markSale");
const updatePayout = require("./wh_controllers/markpayoutStatus");
const updateBank = require("./wh_controllers/updateBank");
const markNewPayout = require("./wh_controllers/payoutCreated")
const updateStripeAccountStatus = require("./wh_controllers/updateAccStatus")
 


async function handleRefundReversal(refund) {
  try {
    // Get the payment intent to find the original PAY
    const paymentIntent = await stripe.paymentIntents.retrieve(refund.payment_intent);
    
    if (paymentIntent && paymentIntent.latest_charge) {
      const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);
      
      if (charge && charge.transfer) {
      const reversal = await stripe.transfers.createReversal(
            charge.transfer,
            {
              amount: refund.amount - (refund.amount * 20 / 100), // Reverses 80% of the refund
            }
          );
        console.log(`Reversal created for refund: ${refund.id}`, reversal);
        return reversal;
      }
    }
    console.log(`No transfer found for refund: ${refund.id}`);
    return null;
  } catch (error) {
    console.error(`Error processing refund reversal for ${refund.id}:`, error);
    throw error;
  }
}

// Function to handle dispute reversals
async function handleDisputeReversal(dispute) {
  try {
    const charge = await stripe.charges.retrieve(dispute.charge);
    
    if (charge && charge.transfer) {
    const reversal = await stripe.transfers.createReversal(
            charge.transfer,
            {
              amount: refund.amount - (refund.amount * 20 / 100), // Reverses 80% of the refund
            }
          );
      console.log(`Reversal created for dispute: ${dispute.id}`, reversal);
      return reversal;
    }
    console.log(`No transfer found for dispute: ${dispute.id}`);
    return null;
  } catch (error) {
    console.error(`Error processing dispute reversal for ${dispute.id}:`, error);
    throw error;
  }
}






module.exports = stripe_webhook =  async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event; 

  try {
   console.log("signature "+ sig)
   console.log("body : " + request.body)
   console.log("endpoint :" + endpointSecret)
   
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("Webhook signature verified");
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Processing event: ${event.type}`);
  console.log(`Processing event OBJECT : ${ event.data.object }`);

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await updateSales(event.data.object); 
        break;
      case "account.external_account.updated":
        await updateBank(event.data.object);
        break;
        
      case "payout.created":
        await markNewPayout(event.data.object)
        break;
 
      case "payout.updated":
        await updatePayout(event.data.object);
        break;
      case "payout.failed":
        await updatePayout(event.data.object);
        break;
      case "payout.paid":
        await updatePayout(event.data.object);
        break;
      case "person.updated" :
        await updateStripeAccountStatus(event.data.object)
        break;

    case "charge.refunded":
        // Handle full or partial refunds
        const refund = event.data.object;
        await handleRefundReversal(refund);
        break;
      
      case "charge.dispute.created":
        // Handle when a dispute is initiated
        const dispute = event.data.object;
        await handleDisputeReversal(dispute);
        break;
      
      case "charge.dispute.closed":
        // Handle when a dispute is closed (you might want to handle wins/losses differently)
        if (event.data.object.status === 'lost') {
          // If the dispute was lost, the funds were already reversed
          console.log(`Dispute ${event.data.object.id} was lost`);
        } else {
          // If dispute was won, you might want to handle this case
          console.log(`Dispute ${event.data.object.id} was won or withdrawn`);
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook event:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }

  response.json({ received: true });
};
