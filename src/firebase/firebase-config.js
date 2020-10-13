import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCZxg7PRMd_C8fDF8xP10V_3rs46JFFtI0",
    authDomain: "proyecto-grado-39c6b.firebaseapp.com",
    databaseURL: "https://proyecto-grado-39c6b.firebaseio.com",
    projectId: "proyecto-grado-39c6b",
    storageBucket: "proyecto-grado-39c6b.appspot.com",
    messagingSenderId: "629587692524",
    appId: "1:629587692524:web:17345412b65989d8f2cec9",
    measurementId: "G-NQQZ3FT2RY"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}