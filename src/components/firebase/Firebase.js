// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0qUxX31udwmuKuNg6AQlLyN6GVvNr8oc",
  authDomain: "todo-list-843c7.firebaseapp.com",
  databaseURL: "https://todo-list-843c7-default-rtdb.firebaseio.com",
  projectId: "todo-list-843c7",
  storageBucket: "todo-list-843c7.appspot.com",
  messagingSenderId: "277393199335",
  appId: "1:277393199335:web:3bcb3c4f47ee858bda9242",
  measurementId: "G-8M7N9ZY1FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db }; // Export the initialized auth method