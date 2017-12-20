  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAARDratt8EoVJUKuyOdBDAMvBfgqXrkOY",
    authDomain: "train-scheduler-f9c93.firebaseapp.com",
    databaseURL: "https://train-scheduler-f9c93.firebaseio.com",
    projectId: "train-scheduler-f9c93",
    storageBucket: "train-scheduler-f9c93.appspot.com",
    messagingSenderId: "637878276454"
  };
  firebase.initializeApp(config);
  
  var database= firebase.database();

  var trainName;
  var destination;
  var frequency;
  var firstTrainTime;
  var nextTrain;
  var minutesUntilTrain;
  var firstTimeConverted;
  var currentTime = moment();
  console.log(currentTime);
  var diffTime;
  var tRemainder;
  var nextTrainFormat;

  

$("#btn-submit").on("click", function(event) {
    event.preventDefault();
    
    trainName = $("#trnName").val().trim();
    destination = $("#dest").val().trim();
    frequency = $("#freq").val().trim();
    firstTrainTime = $("#fstTrn").val().trim();
    firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);
    tRemainder = diffTime % frequency;
    console.log(tRemainder);
    minutesUntilTrain = frequency - tRemainder;
    console.log(minutesUntilTrain);
    nextTrain = moment().add(minutesUntilTrain, "minutes");
    console.log(nextTrain);
    nextTrainFormat = moment(nextTrain).format("HH:mm");
    console.log(nextTrainFormat);
    
    
    var train = {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,
        nextTrainFormat: nextTrainFormat,
        minutesUntilTrain: minutesUntilTrain
    }

     console.log(train);

    database.ref().push(train);

   

    alert("You've booked a train ride!");
    // Clear out input boxes after submit
    trainName = $("#trnName").val("");
    destination = $("#dest").val("");
    frequency = $("#freq").val("");
    firstTrainTime = $("#fstTrn").val("");

});


database.ref().on("child_added", function(snapshot){
  var snap = snapshot.val();
  console.log(snap);

  $("#trnName").text(snap.trainName);
  console.log
  $("#dest").text(snapshot.val().destination);
  $("#freq").text(snapshot.val().frequency);
  $("#fstTrn").text(snapshot.val().firstTrainTime);



});
