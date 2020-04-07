// Set up file for connection with Firebase

import Firebase from 'firebase';
 let config = {
    apiKey: "AIzaSyBZCFkDmimphO3Z9rX_8Pwq3jfKUvzlVxg",
    authDomain: "trivia-app-4dfb8.firebaseapp.com",
    databaseURL: "https://trivia-app-4dfb8.firebaseio.com",
    projectId: "trivia-app-4dfb8",
    storageBucket: "trivia-app-4dfb8.appspot.com",
    messagingSenderId: "181770354013",
    appId: "1:181770354013:web:ba4d01a4bd4700547d3cb4"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();