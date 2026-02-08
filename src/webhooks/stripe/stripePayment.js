const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEB_HOOK_PAYMENT;

const updateSales = require("./wh_controllers/markSale");
 
 
module.exports = stripePayment = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);

  } catch (err) {
    console.error("Webhook signature verification failed for payments:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Stripe Processing event for payments: ${event.type}`);
  //console.log(`Processing event OBJECT:`, event.data.object);

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await updateSales(event.data.object); 
        break;
      case "payment_intent.succeeded":
        break;
      case "charge.dispute.created":
        break;
      case "charge.dispute.closed":
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    return response.status(500).json({ error: "Internal Server Error for payments" });
  }

  response.json({ received: true });
};