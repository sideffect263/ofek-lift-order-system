// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUX2SiVTAZtPnZCZa4MuH-FddbpXT-82c",
  authDomain: "ofek-lift-os.firebaseapp.com",
  projectId: "ofek-lift-os",
  storageBucket: "ofek-lift-os.appspot.com",
  messagingSenderId: "631277567050",
  appId: "1:631277567050:web:841648f129429c3696fab3",
  measurementId: "G-9TSRYTBHTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);