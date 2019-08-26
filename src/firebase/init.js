import firebase from "firebase";
import firestore from "firebase/firestore";

var config = {
  apiKey: "AIzaSyDYrInLd7jPF4-Ixk9NN3MqOd_hNGJg1Mk",
  authDomain: "todo-list-8693b.firebaseapp.com",
  databaseURL: "https://todo-list-8693b.firebaseio.com",
  projectId: "todo-list-8693b",
  storageBucket: "",
  messagingSenderId: "530597685367",
  appId: "1:530597685367:web:91d2865748ac480a"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();
