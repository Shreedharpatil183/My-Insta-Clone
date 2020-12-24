import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBCkKqaY6Pr85zHfyFc2qdi_UzCIBIanOY",
    authDomain: "instagram-myapp.firebaseapp.com",
    databaseURL: "https://instagram-myapp.firebaseio.com",
    projectId: "instagram-myapp",
    storageBucket: "instagram-myapp.appspot.com",
    messagingSenderId: "710921493600",
    appId: "1:710921493600:web:325cde0df54ed280abf705",
    measurementId: "G-68MGDW2KD9"

})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage }




