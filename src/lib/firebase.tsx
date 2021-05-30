import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtbi8HKCR888g_VBO1ddc0deLfIEOfoj4",
    authDomain: "recallit-dev.firebaseapp.com",
    projectId: "recallit-dev",
    storageBucket: "recallit-dev.appspot.com",
    messagingSenderId: "265267109778",
    appId: "1:265267109778:web:348c739601d770a60d2b4b",
    measurementId: "G-WL9K0729Y6"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();