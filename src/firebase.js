// Import the functions you need from the SDKs you need
//firebase.js

import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhKbRfw3fE-t8mVIFcmxS-iQxoZ4J15c4",
  authDomain: "project01-fe0d8.firebaseapp.com",
  projectId: "project01-fe0d8",
  storageBucket: "project01-fe0d8.appspot.com",
  messagingSenderId: "1034601420822",
  appId: "1:1034601420822:web:79577de881a5ee8bdc7d37",
  measurementId: "G-FD4N415PKY"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };

