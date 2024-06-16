// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHOpI_qVz-VgIOQu6lHhclEEVOC_I_CWk",
  authDomain: "ofek-lift-order-system.firebaseapp.com",
  projectId: "ofek-lift-order-system",
  storageBucket: "ofek-lift-order-system.appspot.com",
  messagingSenderId: "527566219284",
  appId: "1:527566219284:web:63df22b4af569524311f01",
  measurementId: "G-25RM4JEVSR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
