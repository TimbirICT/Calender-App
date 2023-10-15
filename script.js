// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


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

$(function () {
  function createTimeBlock(hour) {
    var timeBlock = $("<div>").addClass("row time-block").attr("id", "hour-" + hour);
    var hourColumn = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(hour);
    var textarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");
    var saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
    var saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");
    saveButton.append(saveIcon);
    timeBlock.append(hourColumn, textarea, saveButton);
    return timeBlock;
  }

  
  $(".container-lg").empty();

  
  for (var hour = 9; hour <= 11; hour++) {
    var amPm = "AM";
    var timeLabel = hour + amPm;
    var timeBlock = createTimeBlock(timeLabel);
    $(".container-lg").append(timeBlock);
  }

  
  for (var hour = 12; hour <= 17; hour++) {
    var amPm = "PM";
    var displayHour = hour <= 12 ? hour : hour - 12;
    if (displayHour === 0) {
      displayHour = 12;
    }
    var timeLabel = displayHour + amPm;
    var timeBlock = createTimeBlock(timeLabel);
    $(".container-lg").append(timeBlock);
  }


});

$(function () {

  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings("textarea").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  
  function updateHourStyles() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      $(this).removeClass("past present future");

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  updateHourStyles();

  function loadUserInput() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedInput = localStorage.getItem(blockId);

      if (savedInput !== null) {
        $(this).find("textarea").val(savedInput);
      }
    });
  }

  loadUserInput();

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
