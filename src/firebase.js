import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb9torqCissBaKHYgl3KWrJIUq4o_UPwA",
  authDomain: "fisicoculturismo-48bf6.firebaseapp.com",
  projectId: "fisicoculturismo-48bf6",
  storageBucket: "fisicoculturismo-48bf6.appspot.com",
  messagingSenderId: "669107297455",
  appId: "1:669107297455:web:db6ae78b47c9d7421d885a"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebase.storage();

export{
storage, firestore as default
} 