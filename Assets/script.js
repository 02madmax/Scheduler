// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const saveButton = document.getElementById("save-btn");
const past = document.getElementById("past");
const present = document.getElementById("present");
const future = document.getElementById("future");
const rows = document.getElementsByClassName("row");

$(function () {
  $(".saveBtn").on("click", function () {
    const timeBlock = $(this).closest(".time-block").attr("id");
    const userInput = $(this).siblings("textarea").val();

    localStorage.setItem(timeBlock, userInput);
  });

  // Get the current hour using Day.js
  const currentHour = dayjs().hour();

  $(".time-block").each(function () {
    const timeBlock = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlock < currentHour) {
      $(this).addClass("past");
    } else if (timeBlock === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  $(".time-block").each(function () {
    const timeBlock = $(this).attr("id");
    const userInput = localStorage.getItem(timeBlock);
    if (userInput) {
      $(this).find("textarea").val(userInput);
    }
  });

  // Get the current date using Day.js and format it
  const currentDay = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDay);
});

  $(document).ready(function () {
    const TimeBlocks = $(".time-block");
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
    timeBlocks.each(function () {
      const timeBlock = $(this);
      const hour = parseInt(timeBlock.attr("id").split("-")[1]);
      const eventInput = timeBlock.find("textarea");

      eventInput.val(savedEvents[hour]);

      timeBlock.find(".saveBtn").on("click", function (event) {
        event.preventDefault();
        const eventText = eventInput.val();
        savedEvents[hour] = eventText;
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
      });
    });
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

