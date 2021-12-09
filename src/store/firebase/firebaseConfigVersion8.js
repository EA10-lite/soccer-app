import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBvs2Xmx1YdD8m0poFtI8uxHGst0J89zkg",
  authDomain: "soccer-app-ea10.firebaseapp.com",
  projectId: "soccer-app-ea10",
  storageBucket: "soccer-app-ea10.appspot.com",
  messagingSenderId: "583546581959",
  appId: "1:583546581959:web:4ba079d087c482b0459fe2",
  measurementId: "G-HPBZNJ6XGJ"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots : true });

export default firebase;
