import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    // apiKey: "AIzaSyAcVFPxwUIG9CluleF8caf3AmLfaQztRsE",
    // authDomain: "aplicacionapp-2aa52.firebaseapp.com",
    // projectId: "aplicacionapp-2aa52",
    // storageBucket: "aplicacionapp-2aa52.appspot.com",
    // messagingSenderId: "489494704420",
    // appId: "1:489494704420:web:c79154aaf72312a0a5c3b1"
    apiKey: "AIzaSyBBslmHpGLJ4Zv9lBHfBZbqxr_v9rU_3ZI",
    authDomain: "valorizacionapp.firebaseapp.com",
    projectId: "valorizacionapp",
    storageBucket: "valorizacionapp.appspot.com",
    messagingSenderId: "419454009226",
    appId: "1:419454009226:web:85166a0b6564ddcbad1273",
    measurementId: "G-6NFLRN5C0T"
  };
  // Initialize Firebase


  // export const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  ;