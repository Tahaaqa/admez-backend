const Media = require("../../../models/media.model");
const Sale = require("../../../models/sale.model")
const FCM = require("../../../models/fcmToken.model");
const sendNotification = require("./notification");

const updateSales = async (paymentIntent) => {
  try {

    if (!paymentIntent?.metadata?.mediaId) {
      console.error("Missing mediaId in paymentIntent metadata");
      return;
    }

    const mediaId = paymentIntent.metadata.mediaId;
    const updatedMedia = await Media.findOneAndUpdate(
      { _id: mediaId },
      { $inc: { sales: 1 } },
      { new: true } // Return the updated document
    );

    const newSale = await Sale.create({
            amount : paymentIntent.amount_total,
            user : paymentIntent?.metadata?.userId ,
            mediaId : paymentIntent?.metadata?.mediaId ,
            status : paymentIntent.payment_status,
    })

    if (!updatedMedia) {
      console.warn(`No media found with ID ${mediaId}`);
    } else {
      
      
    try {
            console.log("......................... IN NOTIFICATION SENDER ................................")
            const token = await FCM.findOne({user : paymentIntent.metadata.userId})
            total = paymentIntent.amount_subtotal;
            const feeAmount = Math.trunc((total * 10) / 100);  
            salePrice = total - (feeAmount * 2 )
            console.log((salePrice/100).toFixed(2))
            var st = `You've just received $${(salePrice/100).toFixed(2)}!`
            console.log(st)
      
            if(token.fcmToken) {
              await sendNotification (token.fcmToken , "New Sale !" , st)
            }
            else {
              console.log("no FCM token available to send notification")
            }
            
            console.log("......................... END OF NOTIFICATION SENDER ................................")
      console.log(`Media ${mediaId} sales updated successfully`);
    }
    catch (e) {
        console.log(`Media ${mediaId} sales didnt send notification !!!!`);
    }

    }
  } catch (e) {
    console.error(`Failed to update media ${paymentIntent.metadata.mediaId}:`, e.message);
  }
};

module.exports = updateSales;
