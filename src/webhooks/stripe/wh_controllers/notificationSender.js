const FCM = require("../../../models/fcmToken.model.js")
const asyncHandler = require("../../../utils/errors/asyncHandler.js")
const sendNotification = require("../wh_controllers/notification.js")

const notiSender = async (object)=> {
  try {


    console.log("......................... IN NOTIFICATION SENDER ................................")
      const token = await FCM.findOne({user : object.metadata.userId})

      if(token.fcmToken) {
        await sendNotification (token.fcmToken , "Duckie!" , `Someone paid for you egg with ${object.transfer_data.amount/100} $`)
      }
      else {
        console.log("no FCM token available to send notification")
      }
      
      console.log("......................... END OF NOTIFICATION SENDER ................................")

 
  } catch (e) {
    console.error(`Failed to send notification media :`, e.message);
  }
}

module.exports = notiSender