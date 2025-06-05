// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDDHx6UsRvlgFZfKpRFaG80LzVl8pSu8c",
  authDomain: "monsta-ae230.firebaseapp.com",
  projectId: "monsta-ae230",
  storageBucket: "monsta-ae230.firebasestorage.app",
  messagingSenderId: "415192139611",
  appId: "1:415192139611:web:cb440441566abea2263c7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
module.exports={app,auth};