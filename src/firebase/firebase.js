/// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmFPNN8soTnZGH6I1U90B7-Fjj3OwfJlQ",
  authDomain: "quiz-fffc1.firebaseapp.com",
  databaseURL: "https://quiz-fffc1-default-rtdb.firebaseio.com",
  projectId: "quiz-fffc1",
  storageBucket: "quiz-fffc1.appspot.com",
  messagingSenderId: "829605283369",
  appId: "1:829605283369:web:5bd6232b3df6d98540be38",
  measurementId: "G-3KXZ1GBL0T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
