// Initialize Firebase

 var config = {
    apiKey: "AIzaSyAcMaCtF9wngaAIAtFJAeF7Q2xkzFDjud0",
    authDomain: "firstfirebasetrinity.firebaseapp.com",
    databaseURL: "https://firstfirebasetrinity.firebaseio.com",
    storageBucket: "firstfirebasetrinity.appspot.com",
    messagingSenderId: "551160138408"
  };

  firebase.initializeApp(config);

// Create a variable to reference the database

var database = firebase.database();

// Initial Values
var namesAndTimes = [];

var timeTillNextTrain;
var nextTrainTime;

// var newTrain = {
//       name : "trainName",
//       destination : "destination",
//       frequency : 55,
//       nextArrival : 22,
//       minutesAway : 33
//   };

// namesAndTimes.push(newTrain);
// console.log("names and trains = " + namesAndTimes);
// // Save the new train details in Firebase
// database.ref().set(namesAndTimes);


// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {

  var tempNamesAndTimes = snapshot.val();
  var numberOfTrains = tempNamesAndTimes.length;
  $("#tableContentsDiv").empty();

  for (var i = 0; i < numberOfTrains; i++) {
    console.log("initial load or Value Change");
    console.log(tempNamesAndTimes[i]);
    namesAndTimes.push(tempNamesAndTimes[i])

    var trainNameDiv = $("<div>");
    trainNameDiv.addClass("train-name");
    trainNameDiv.addClass("col-sm-3");
    trainNameDiv.html("<b>"+namesAndTimes[i].name+"</b>");
    $("#tableContentsDiv").append(trainNameDiv);

    var destinationDiv = $("<div>");
    destinationDiv.addClass("columnDestination");
    destinationDiv.addClass("col-sm-3");
    destinationDiv.html("<b>"+namesAndTimes[i].destination+"</b>");
    $("#tableContentsDiv").append(destinationDiv);

    var frequencyDiv = $("<div>");
    frequencyDiv.addClass("columnFrequency");
    frequencyDiv.addClass("col-sm-2");
    frequencyDiv.html("<b>"+namesAndTimes[i].frequency+"</b>");
    $("#tableContentsDiv").append(frequencyDiv);

    var nextArrivalDiv = $("<div>");
    nextArrivalDiv.addClass("columnNextArrival");
    nextArrivalDiv.addClass("col-sm-2");
    nextArrivalDiv.html("<b>"+namesAndTimes[i].nextArrival+"</b>");
    $("#tableContentsDiv").append(nextArrivalDiv);

    var minutesAwayDiv = $("<div>");
    minutesAwayDiv.addClass("columnMinutesAway");
    minutesAwayDiv.addClass("col-sm-2");
    minutesAwayDiv.html("<b>"+namesAndTimes[i].minutesAway+"</b>");
    $("#tableContentsDiv").append(minutesAwayDiv);
  }
// If any errors are experienced, log them to console.
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-train-info").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var trainName = $('#train-name').val().trim();
  var destination = $('#destination').val().trim();
  var firstTrainTime = $("#first-train-time").val().trim();
  var frequency = $("#frequency").val().trim();

  // Check to see if it already exists
  // if (trainName in namesAndTimes) {

    // Alert
    // alert("It's almost yours!!!.");

  var lengthOfArray = namesAndTimes.length;
  console.log("number of trains = " + lengthOfArray);
  var newTrain = "train" + lengthOfArray;
  console.log("index of new train = " + newTrain);



  firstTrainTime = moment(firstTrainTime, "HH:mm");
  var currentTime = moment();
  console.log("is first time before current time " + firstTrainTime.isBefore(currentTime));

  if (firstTrainTime.isBefore(currentTime)) {

    var tempMoment = firstTrainTime;

    while (tempMoment.isBefore(currentTime)) {
      tempMoment = moment(tempMoment).add(frequency, "minutes");
      console.log("frequency added to first train time");
      console.log(moment(tempMoment).format("h:mm a"));
    }

    nextTrainTime = moment(tempMoment).format("h:mm a");
    currentTime = moment();
    timeTillNextTrain = moment(tempMoment).diff(currentTime, "minutes");
    console.log("time till next train = " + timeTillNextTrain);

  } else {
    // time of first train is after current time
    timeTillNextTrain = moment(firstTrainMoment).diff(currentTime, "minutes");
    console.log("time till next train = " + timeTillNextTrain);
    nextTrainTime = moment(firstTrainTime).format("h:mm a");
  }

  var newTrain = {
      name : trainName,
      destination : destination,
      frequency : frequency,
      nextArrival : nextTrainTime,
      minutesAway : timeTillNextTrain
  };

  namesAndTimes.push(newTrain);
  console.log("names and trains = " + namesAndTimes);
    // Save the new train details in Firebase
  database.ref().set(namesAndTimes);

  // Log the new train details
  console.log("New Train info received");
  console.log("trainName = " + trainName);
  console.log("destination = " + destination);
  console.log("firstTrainTime = " + firstTrainTime);
  console.log("frequency = " + frequency);


// // find the time of next train
//   var currentTime = moment();
//   console.log("currentTime = " + currentTime);

//   console.log("first train time = " + firstTrainTime);
//   // firstTrainTime = moment(firstTrainTime, 'HH:mm');


//   var firstTrainTime = "08:45";
//   var frequncy = 90;

//   var currentTime = moment();

//   var firstTrainMoment = moment(firstTrainTime, "HH:mm");

//   console.log(firstTrainMoment.isBefore(currentTime));





//   firstTrainTime = moment(firstTrainTime, 'HH:ss');
//   console.log("firstTrainTime formatted = " + firstTrainTime);

//   var timeToNextTrain = moment(firstTrainTime).add(frequency, 'minutes');
//   console.log("timeToNextTrain = " + timeToNextTrain);

//   console.log("before while " + timeToNextTrain);
//   if (timeToNextTrain <= currentTime) {
//     timeToNextTrain = timeToNextTrain + frequency;
//   }
//   console.log("after while " + timeToNextTrain);

//   // temp values for these two variables
//   var nextArrival = 99;
//   var minutesAway = 99; 

  console.log("latest train info displayed")
 
});