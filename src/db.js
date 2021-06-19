import firebase from "firebase/app";
import "firebase/database";

const config = {
	apiKey: "AIzaSyC3SxCK1tbIum4z32zciP4qgTqQPZp73nE",
    authDomain: "adatbazis-b1da0.firebaseapp.com",
    databaseURL: "https://adatbazis-b1da0.firebaseio.com",
    projectId: "adatbazis-b1da0",
    storageBucket: "adatbazis-b1da0.appspot.com",
    messagingSenderId: "883423201931",
    appId: "1:883423201931:web:5f758b543461b1a49fe28e"
}

const db = firebase.initializeApp(config);
export default db;