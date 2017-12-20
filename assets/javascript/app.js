  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAARDratt8EoVJUKuyOdBDAMvBfgqXrkOY",
    authDomain: "train-scheduler-f9c93.firebaseapp.com",
    databaseURL: "https://train-scheduler-f9c93.firebaseio.com",
    projectId: "train-scheduler-f9c93",
    storageBucket: "",
    messagingSenderId: "637878276454"
  };
  firebase.initializeApp(config);
  
  var database= firebase.database();
  var trainName ="";
  var  destination ="";
  var  freqeuncy = "";
