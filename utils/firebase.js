import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAcVFPxwUIG9CluleF8caf3AmLfaQztRsE",
    authDomain: "aplicacionapp-2aa52.firebaseapp.com",
    projectId: "aplicacionapp-2aa52",
    storageBucket: "aplicacionapp-2aa52.appspot.com",
    messagingSenderId: "489494704420",
    appId: "1:489494704420:web:c79154aaf72312a0a5c3b1"
  };
  // Initialize Firebase


  export const firebaseApp = firebase.initializeApp(firebaseConfig);