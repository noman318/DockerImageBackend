const firebase ="firebase/app";
// const messaging="firebase/messaging";
function getToken() {
    const messaging = firebase.messaging();
    // [START messaging_get_token]
    // Get registration token. Initially this makes a network call, once retrieved
  
    // subsequent calls to getToken will return from cache.
    messaging.getToken({ vapidKey: 'BDV2olqLKFiicb-_VuxAg3cYJEbbOj1vbduEuhxdovzpYFyUg82Un3xVFVFyTyU8DVOtkR6brn8CVCjiUXyTmdA' }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
    // [END messaging_get_token]
  }
  module.exports=getToken