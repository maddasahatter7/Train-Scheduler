  
  // Global Firebase Moment 
  // Steps to complete:
  
  // 1. Initialize Firebase
  // 2. Create button for adding new train arrivals, departures, destination ect - then update the html + update the database
  // 3. Create a way to retrieve train information converting time with moment
  // 4. Figure out moment
  // 5. Take values from input elements and put them into an object and push them to firebase
  // 6. Take "last child"/object from firebase and append it to DOM using a callback function and attaching the input value
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
  // moment current time method
  var currentTime = moment();
  var firstInstanceOfTime = "3:00";
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
    // First time minus a year bc we are avoiding dublicate times
    firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Differences between times 
    diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);
    // Trying to get the difference between the times remaining between train rides
    tRemainder = diffTime % frequency;
    console.log(tRemainder);
      // Trying to get the difference between the times between train rides, still not working correctly
    minutesUntilTrain = frequency - tRemainder;
    console.log(minutesUntilTrain);
    // Adding current time of the next train
    nextTrain = moment().add(minutesUntilTrain, "minutes");
    console.log(nextTrain);
    // Finally formatting the time for Next Arrival
    nextTrainFormat = moment(nextTrain).format("HH:mm");
    console.log(nextTrainFormat);
    
    // object that contains data that will enter firebase
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

   
    // yay we got one!
    alert("Vous avez réservé votre ticket de métro!");
    // Clear out input boxes after submit
    trainName = $("#trnName").val("");
    destination = $("#dest").val("");
    frequency = $("#freq").val("");
    firstTrainTime = $("#fstTrn").val("");

});

// At the initial load, get a snapshot of the current data.
database.ref().on("child_added", function(snapshot){
    // Need to know when first train arrives and how often 
// Train Infomations :)
 var childDestination = snapshot.val().destination;
 var childFrequency = snapshot.val().frequency;
 var childTrainTime = snapshot.val().firstTrainTime;
 var childTrainName = snapshot.val().trainName;
 var childNextFormat = snapshot.val().nextTrainFormat
 var childMinutesAway = snapshot.val().minutesUntilTrain;
 // Need to figure this out ????????
//  var childMinutesUntilTrain = snapshot.val().minutesUntilTrain;

 console.log(childDestination, childFrequency, childTrainTime, childTrainName, );
// grabbing last object/child from database and appending to the DOM
// Need to fix equation and append childMinutesUntilTrain
 $("#table").append(
    "<tr><td>" + childTrainName + "</td><td>" + childDestination 
    + "</td><td>" + childFrequency + "</td><td>"
    + childNextFormat + "</td><td>"
    + childMinutesAway + "</td></tr>");
});
