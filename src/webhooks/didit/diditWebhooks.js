const crypto = require("crypto");
const Verification = require("../../models/verification.model")
const SubmitstripeVerification = require("./wh_controllers/stripeVerification")
const User = require("../../models/user.model")

const WEBHOOK_SECRET_KEY = process.env.DIDIT_WEBHOOK_SECRET_KEY 
 
 
module.exports = didit_webhook = async (req, res) => {
try {
    const signature = req.get("X-Signature");
    const timestamp = req.get("X-Timestamp");

    // Ensure all required data is present
    if (!signature || !timestamp || !req.rawBody || !WEBHOOK_SECRET_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 3) Validate the timestamp to ensure the request is fresh (within 5 minutes)
    const currentTime = Math.floor(Date.now() / 1000);
    const incomingTime = parseInt(timestamp, 10);
    if (Math.abs(currentTime - incomingTime) > 300) {
      return res.status(401).json({ message: "Request timestamp is stale." });
    }

    // 4) Generate an HMAC from the raw body using your shared secret
    const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET_KEY);
    const expectedSignature = hmac.update(req.rawBody).digest("hex");

    // 5) Compare using timingSafeEqual for security
    const expectedSignatureBuffer = Buffer.from(expectedSignature, "utf8");
    const providedSignatureBuffer = Buffer.from(signature, "utf8");

    if (
      expectedSignatureBuffer.length !== providedSignatureBuffer.length ||
      !crypto.timingSafeEqual(expectedSignatureBuffer, providedSignatureBuffer)
    ) {
      return res.status(401).json({
        message: `Invalid signature. Computed (${expectedSignature}), Provided (${signature})`,
      });
    }

    // 6) Parse the JSON and proceed (signature is valid at this point)
    const jsonBody = JSON.parse(req.rawBody);
    const { session_id, status, vendor_data, workflow_id } = jsonBody;

    console.log(`kyc web hook catched STATUS : ${status}`)
    if (status.toLowerCase() != "in progress" && status.toLowerCase() != "not started"  && status.toLowerCase() != "abandoned"  && status.toLowerCase() != "expired"){
      await Verification.findOneAndUpdate(
        { user: vendor_data },  
        {                      
          $set: {
            sessionId: session_id,
            status: status.toLowerCase(),
            date: new Date(),   
          }
        },
        {                    
          upsert: true,    
        }
      )
    }
    const user = await User.findOne({_id : vendor_data })

    if (status.toLowerCase() == "approved" && user.StripeAccountStatus != "verified" && user.StripeAccountStatus != "pending" ){
      await SubmitstripeVerification(vendor_data , jsonBody.decision.id_verification , jsonBody.decision.face_match)
    }
    if (status.toLowerCase() == "in review" && user.StripeAccountStatus != "verified" && user.StripeAccountStatus != "pending" ){
      await SubmitstripeVerification(vendor_data , jsonBody.decision.id_verification , jsonBody.decision.face_match)
    }

 
 
    return res.json({ message: `didit Webhook event dispatched for ${vendor_data} user with status of ${status}` });
  } catch (error) {
    console.error("Error in /webhook handler:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
 
 
