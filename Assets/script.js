// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const saveButton = document.getElementById("save-btn");
const past = document.getElementById("past");
const present = document.getElementById("present");
const future = document.getElementById("future");
const rows = document.getElementsByClassName("row");

// this function adds functionality to the save button, when clicked it will save the user input to local storage
$(function () {
  // Function to add functionality to the save button
  $(".saveBtn").on("click", function () {
    const timeBlock = $(this).closest(".time-block").attr("id");
    const userInput = $(this).siblings("textarea").val();
    localStorage.setItem(timeBlock, userInput);
  });

  // Get the current hour using Day.js
  const currentHour = dayjs().hour();

  // Loop over each time block and apply classes based on the current hour
  $(".time-block").each(function () {
    const timeBlock = $(this);
    const timeBlockID = timeBlock.attr("id");
    const hour = parseInt(timeBlockID.split("-")[1]);

    // Determine if the time block is in the past, present, or future
    // and apply the appropriate class
    if (hour < currentHour) {
      timeBlock.removeClass("present future").addClass("past");
    } else if (hour === currentHour) {
      timeBlock.removeClass("past future").addClass("present");
    } else {
      timeBlock.removeClass("past present").addClass("future");
    }

    // Retrieve and set user input from local storage
    const userInput = localStorage.getItem(timeBlockID);
    if (userInput) {
      timeBlock.find("textarea").val(userInput);
    }
  });

  // Get the current date using Day.js and format it
  const currentDay = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDay);
});





  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

