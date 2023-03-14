// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF0d3B81_5kkuwwk3wYCoSoLfbYvyLc-k",
  authDomain: "chat-abebb.firebaseapp.com",
  projectId: "chat-abebb",
  storageBucket: "chat-abebb.appspot.com",
  messagingSenderId: "222530649400",
  appId: "1:222530649400:web:1dda95b66f994af46d55cd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage= getStorage();
export const db= getFirestore();