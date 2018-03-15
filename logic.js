
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpM4xMpjt3WeyDfnWMytMH16JSWmI1lt8",
    authDomain: "employee-list-5320b.firebaseapp.com",
    databaseURL: "https://employee-list-5320b.firebaseio.com",
    projectId: "employee-list-5320b",
    storageBucket: "employee-list-5320b.appspot.com",
    messagingSenderId: "388600441473"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


$("#submit").on("click", function() {
    event.preventDefault();
    console.log("this is a test");

    var name = $("#employee-name").val().trim();
    var role =  $("#role").val().trim();
    var start = $("#start-date").val().trim();
    var rate = $("#monthly-rate").val().trim();
    database.ref().push({
        name: name,
        role: role,
        start: start,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

});

database.ref().on("child_added", function(childSnapshot){
    var newborn = childSnapshot.val()
    console.log(newborn.name);
    var row = $("<tr>");
    var nameDisplay = $("<td>");
    nameDisplay.text(newborn.name);
    var roleDisplay = $("<td>");
    roleDisplay.text(newborn.role);
    var startDisplay = $("<td>");
    startDisplay.text(moment(newborn.start).format("MM/DD/YYYY"));
    var workDisplay = $("<td>");
   // workDisplay.text(findMonthsWorked(newborn));
   var monthsWorked = moment().diff(newborn.start, "months")
   workDisplay.text(monthsWorked);

    var rateDisplay = $("<td>");
    rateDisplay.text(newborn.rate);
    var billDisplay = $("<td>");
    billDisplay.text(monthsWorked*newborn.rate);

    row.append(nameDisplay, roleDisplay, startDisplay, workDisplay, rateDisplay, billDisplay);
    $("tbody").append(row);

});

var randomDate = "02/23/1999";
var randomFormat = "MM/DD/YYYY";
var convertedDate = moment(randomDate, randomFormat);


/*

function findMonthsWorked(newborn){
    var d = new Date();
    var currentMonth = d.getMonth() + 1;
    var currentYear = d.getFullYear();
    var startMonth = parseInt(newborn.startDate.substring(6,8))
    var startYear = parseInt(newborn.startDate.substring(0,5))
    var yearsBetween = currentYear - startYear;
    var yearsBetweenInMonths = yearsBetween * 12;
    var monthsBetween = currentMonth - startMonth;
   //var monthsWorked = yearsBetweenInMonths + monthsBetween;
   // return monthsWorked;
   return yearsBetweenInMonths + monthsBetween;

}

*/