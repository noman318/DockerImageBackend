const messaging =require('./firebaseInit');
const admin =require('firebase-admin')
const sendNotificationToClient = (tokens, data) => {
  // Send a message to the devices corresponding to the provided
  // registration tokens.
  
  const message = {
    data: {
      score: '850',
      time: '2:45'
    },
    token: tokens
  };
  
//  console.log(messaging)
 admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
//   messaging
//     .sendMulticast(message)
//     .then(response => {
//       // Response is an object of the form { responses: [] }
//       console.log(response)
//       const successes = response.responses.filter(r => r.success === true)
//         .length;
//       const failures = response.responses.filter(r => r.success === false)
//         .length;
//       console.log(
//         'Notifications sent:',
//         `${successes} successful, ${failures} failed`
//       );
//     })
//     .catch(error => {
//       console.log('Error sending message:', error);
//     });
};
module.exports={sendNotificationToClient}