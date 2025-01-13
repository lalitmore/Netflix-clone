import Firebase from "firebase/compat/app";
//import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyBomAGQc84OPzfAi_zIJS3yKsU_PZt2vfQ",
    authDomain: "netflix-dca90.firebaseapp.com",
    projectId: "netflix-dca90",
    storageBucket: "netflix-dca90.firebasestorage.app",
    messagingSenderId: "719466860403",
    appId: "1:719466860403:web:0b7a8fb86cc5365bd7ff06"
};

//const firebase = Firebase.initializeApp(config);
const firebase = initializeApp(config)



export { firebase };