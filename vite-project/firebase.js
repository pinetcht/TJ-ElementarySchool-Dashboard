// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_Y1NvLWBGe0FVQlkJZ-Thb7u0ydt8_EY",
    authDomain: "tj-dashboard-2cab6.firebaseapp.com",
    projectId: "tj-dashboard-2cab6" ,
    storageBucket: "tj-dashboard-2cab6.appspot.com" ,
    messagingSenderId: "78025562258",
    appId: "1:78025562258:web:22f18e09ce30099da7ae4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}
