const admin = require("firebase-admin");
const serviceAccount = require("../../../utils/firebase-key/push-notification-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendNotification(token, title, body, data = {}) {
  const message = {
    token: token,
    notification: {
      title: title,
      body: body
    },
    data: {
      ...data,
      click_action: "FLUTTER_NOTIFICATION_CLICK" // Required for Flutter navigation
    },
    // iOS-specific configuration
    apns: {
      payload: {
        aps: {
          sound: "default",
          badge: 1,
          mutableContent: 1 // Required for rich notifications
        }
      },
      headers: {
        'apns-priority': '10' // Immediate delivery
      }
    },
    // Android-specific configuration
    android: {
      priority: "high",
      notification: {
        channel_id: "high_importance_channel",
        sound: "default"
      }
    }
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);

    // Handle specific error cases
    if (error.code === 'messaging/invalid-registration-token' || 
        error.code === 'messaging/registration-token-not-registered') {
      // Remove invalid token from database
      await FCM.findOneAndUpdate(
        { fcmToken: token },
        { $unset: { fcmToken: 1 } }
      );
      
    }

    throw error;
  }
}

module.exports = sendNotification;