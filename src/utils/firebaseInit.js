const admin = require('firebase-admin');
const serviceAccount = require('../config/event-booking-firebase-admin-config.json');
/**
 * @description Initialize the Firebase Admin SDK with the provided service account credentials.
 */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
/**
 * @description Get the messaging instance from the initialized Firebase Admin SDK.
 */
const messaging = admin.messaging();

module.exports = messaging