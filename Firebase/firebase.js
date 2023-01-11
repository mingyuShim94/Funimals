// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDOeY7e7RPdXlre5Y-kt56nLPtrMyNyc54',
  authDomain: 'funimals-2ae1b.firebaseapp.com',
  databaseURL: 'https://funimals-2ae1b-default-rtdb.firebaseio.com',
  projectId: 'funimals-2ae1b',
  storageBucket: 'funimals-2ae1b.appspot.com',
  messagingSenderId: '145646459312',
  appId: '1:145646459312:web:94e6eda129c59838b15e75',
  measurementId: 'G-WE6K6BRW93',
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
// const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore(app);
