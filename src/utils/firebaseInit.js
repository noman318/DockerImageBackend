var admin = require("firebase-admin");

var serviceAccount = require("../../react-302be-firebase-adminsdk-h2vnp-62f2be9054.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const messaging=admin.messaging();
 module.exports=messaging