const admin = require('firebase-admin');
const serviceAccount = require('./firebasekey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://pramukh-electricals.appspot.com',
});

const storageBucket = admin.storage().bucket();

module.exports = storageBucket;
