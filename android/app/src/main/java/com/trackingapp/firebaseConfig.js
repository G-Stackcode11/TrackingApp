// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB5JW4VvGvsCDnM-W7DQAZKJXOEPAHJjUA",
  authDomain: "animaltrackingapp-cd866.firebaseapp.com",
  projectId: "animaltrackingapp-cd866",
  storageBucket: "animaltrackingapp-cd866.appspot.com",
  messagingSenderId: "985728365133",
  appId: "1:985728365133:android:7f7e297604479f6353e204"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
