const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig); 

exports.sendMessage = functions.firestore
  .document('products/{productId}')
  .onCreate((snapshot, context)=>{
    const docId = context.params.productId;
    const name = snapshot.data().name;
    const productRef = admin.firestore().collection('products').doc(docId);
    return productRef.update({ message: `Nice ${name}! - Love Cloud Functions`});
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
