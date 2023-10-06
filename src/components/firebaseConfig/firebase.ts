// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnX4Ne6HFJs9rp5nrcMq4luArs3LCK3uM",
  authDomain: "apis-d7a23.firebaseapp.com",
  databaseURL: "https://apis-d7a23-default-rtdb.firebaseio.com",
  projectId: "apis-d7a23",
  storageBucket: "apis-d7a23.appspot.com",
  messagingSenderId: "267444143416",
  appId: "1:267444143416:web:0bcf18011c7c076192adcd",
  measurementId: "G-5GGLDPYMP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)