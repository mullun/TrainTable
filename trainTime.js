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

// Initialize table of trains
// $("#tableContentsDiv").empty();

// numberOfTrains = namesAndTimes.length;
// for (var i = 0; i < numberOfTrains; i ++) {

//   var trainNameDiv = $("<div>");
//   trainNameDiv.addClass("train-name");
//   trainNameDiv.addClass("col-sm-3");
//   trainNameDiv.html("<b>"+namesAndTimes[i].name+"</b>");
//   $("#tableContentsDiv").append(trainNameDiv);

//   var destinationDiv = $("<div>");
//   destinationDiv.addClass("columnDestination");
//   destinationDiv.addClass("col-sm-3");
//   destinationDiv.html("<b>"+namesAndTimes[i].destination+"</b>");
//   $("#tableContentsDiv").append(destinationDiv);

//   var frequencyDiv = $("<div>");
//   frequencyDiv.addClass("columnFrequency");
//   frequencyDiv.addClass("col-sm-2");
//   frequencyDiv.html("<b>"+namesAndTimes[i].frequency+"</b>");
//   $("#tableContentsDiv").append(frequencyDiv);

//   var nextArrivalDiv = $("<div>");
//   nextArrivalDiv.addClass("columnNextArrival");
//   nextArrivalDiv.addClass("col-sm-2");
//   nextArrivalDiv.html("<b>"+namesAndTimes[i].nextArrival+"</b>");
//   $("#tableContentsDiv").append(nextArrivalDiv);

//   var minutesAwayDiv = $("<div>");
//   minutesAwayDiv.addClass("columnMinutesAway");
//   minutesAwayDiv.addClass("col-sm-2");
//   minutesAwayDiv.html("<b>"+namesAndTimes[i].minutesAway+"</b>");
//   $("#tableContentsDiv").append(minutesAwayDiv);

// }

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

  var newTrain = {
      name : trainName,
      destination : destination,
      frequency : frequency,
      nextArrival : 22,
      minutesAway : 33
  };

  namesAndTimes.push(newTrain);
  console.log("names and trains = " + namesAndTimes);
    // Save the new train details in Firebase
    database.ref().set(namesAndTimes);

    // Log the new train details
    console.log("New Train info received");
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // find the time of next train
    var currentTime = moment().format('LT');
    console.log(currentTime);
    console.log("first train time = " + firstTrainTime);
    var firstTrainTimeFromatted = moment().format('hh:mm', firstTrainTime);
    console.log("firstTrainTimeFromatted = " + firstTrainTimeFromatted);
    var timeToNextTrain = firstTrainTime + frequency;
    console.log("before while " + timeToNextTrain);
    if (timeToNextTrain <= currentTime) {
      timeToNextTrain = timeToNextTrain + frequency;
    }
    console.log("after while " + timeToNextTrain);

    // temp values for these two variables
    var nextArrival = 99;
    var minutesAway = 99; 

    console.log("latest train info displayed")
  });