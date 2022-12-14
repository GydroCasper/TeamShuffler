import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, onValue } from 'firebase/database';
import { setRegisteredUser } from '../state.js';

const connect = () => {
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
  return database;
};

export const saveGender = async (userId, userFirstName, userName, userLastName, isMale) => {
  const database = connect();

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

export const fetchUserInfo = (chatId, userId) => {
  const database = connect();
  const reference = ref(database, 'players/' + userId);

  onValue(reference, (snapshot) => {
    setRegisteredUser(chatId, userId, {
      isMale: snapshot.val()?.isMale,
    });
  });
};
