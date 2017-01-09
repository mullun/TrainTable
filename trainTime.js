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
console.log("database = " + database);
// Initial Values
var namesAndTimes = [];

namesAndTimes.push(database[0]);

var train0 = {
    name : "Train Zero",
    destination : "Chicago",
    frequency : 34,
    nextArrival : 34,
    minutesAway : 34
};

namesAndTimes.push(train0);
console.log("names and trains = " + namesAndTimes[0].name);

var trainNameDiv = $("<div>");
trainNameDiv.addClass("train-name");
trainNameDiv.addClass("col-sm-3");
trainNameDiv.html("<b>"+namesAndTimes[0].name+"</b>");
$("#tableContentsDiv").append(trainNameDiv);

var destinationDiv = $("<div>");
destinationDiv.addClass("columnDestination");
destinationDiv.addClass("col-sm-3");
destinationDiv.html("<b>"+namesAndTimes[0].destination+"</b>");
$("#tableContentsDiv").append(destinationDiv);

var frequencyDiv = $("<div>");
frequencyDiv.addClass("columnFrequency");
frequencyDiv.addClass("col-sm-2");
frequencyDiv.html("<b>"+namesAndTimes[0].frequency+"</b>");
$("#tableContentsDiv").append(frequencyDiv);

var nextArrivalDiv = $("<div>");
nextArrivalDiv.addClass("columnNextArrival");
nextArrivalDiv.addClass("col-sm-2");
nextArrivalDiv.html("<b>"+namesAndTimes[0].nextArrival+"</b>");
$("#tableContentsDiv").append(nextArrivalDiv);

var minutesAwayDiv = $("<div>");
minutesAwayDiv.addClass("columnMinutesAway");
minutesAwayDiv.addClass("col-sm-2");
minutesAwayDiv.html("<b>"+namesAndTimes[0].minutesAway+"</b>");
$("#tableContentsDiv").append(minutesAwayDiv);



var initialBid = 0;
var initialBidder = "Still waiting";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the initial variables for highBidder equal to the stored values.
    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);

    // Change the HTML to reflect the initial value
    $('#highest-bidder').html(snapshot.val().highBidder);
    $('#highest-price').html("$" + snapshot.val().highPrice);

    // Print the initial data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice)
  }

  // Keep the initial variables for highBidder equal to the initial values
  else {

    // Change the HTML to reflect the initial value
    $('#highest-bidder').html(highBidder);
    $('#highest-price').html("$" + highPrice);

    // Print the initial data to the console.
    console.log("Current High Price")
    console.log(highBidder);
    console.log(highPrice)
  }

// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
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
  var newTrain = "train"+lengthOfArray;
  console.log("index of new train = " + newTrain);

  var newTrain = {
      name : trainName,
      destination : destination,
      frequency : frequency,
      nextArrival : 34,
      minutesAway : 34
  };

  namesAndTimes.push(newTrain);
  console.log("names and trains = " + namesAndTimes);
    // Save the new price in Firebase
    database.ref().set(namesAndTimes);

    // Log the new High Price
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

    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").html(bidderName);
    $("#highest-price").html("$" +  bidderPrice);
  // }

  // else {
  //   // Alert
  //   alert("Someone else thinks it is worth more. Try again.");
  // }

});