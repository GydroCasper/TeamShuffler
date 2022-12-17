import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref } from 'firebase/database';

export const saveGender = async (userId, userFirstName, userName, userLastName, isMale) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_APP_DOMAIN,
    databaseURL: process.env.FIREBASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const playerObject = { isMale: isMale };

  if (userFirstName) {
    playerObject.firstName = userFirstName;
  }

  if (userName) {
    playerObject.userName = userName;
  }

  if (userLastName) {
    playerObject.lastName = userLastName;
  }

  await set(ref(database, 'players/' + userId), playerObject);
};
