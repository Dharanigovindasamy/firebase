// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your Firebase Config (from Firebase Console -> Project Settings)
const firebaseConfig = {
    apiKey: "AIzaSyCdv4wrarmpGbPSYr6x05AR0LsyHpvnO84",
    authDomain: "task-management-dac37.firebaseapp.com",
    projectId: "task-management-dac37",
    storageBucket: "task-management-dac37.firebasestorage.app",
    messagingSenderId: "844473722624",
    appId: "1:844473722624:web:ea38257b3e04a5ef5935e5",
    measurementId: "G-5BTE36W070"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);
//const storage = getStorage(firebaseApp);
//const analytics = getAnalytics(app);

export { auth, db, provider, signInWithPopup, signOut};