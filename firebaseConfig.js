// firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDpjx0ZivTMOA3xbHPaaNw1lLTYtkR48aI",
  authDomain: "animaltrackingapp-cd866.firebaseapp.com",
  projectId: "animaltrackingapp-cd866",
  storageBucket: "animaltrackingapp-cd866.appspot.com",
  messagingSenderId: "985728365133",
  appId: "1:985728365133:web:5d236da6b61036867875a7",
  measurementId: "G-VH8CRMP3Z1"
};

export const firebaseApp = initializeApp(firebaseConfig);
