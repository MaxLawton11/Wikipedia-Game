// ./scripts/clock.js

function startClock() {
    var clock = document.getElementById("clock");
    // start the clock timer
    var startTime = Date.now(); // Record the start time
    timerInterval = setInterval(function() {
      var currentTime = Date.now();
      var elapsedTime = currentTime - startTime;
      var formattedTime = formatTime(elapsedTime);
      clock.textContent = formattedTime;
    }, 10);
  }
  
  function stopClock() {
    clearInterval(timerInterval);
    clock.textContent = "0:00:000";
  }

  // for time printing
function formatTime(milliseconds) {
    var totalSeconds = Math.floor(milliseconds / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    var milliseconds = milliseconds % 1000;
    return minutes + ":" + padZero(seconds, 2) + ":" + padZero(milliseconds, 3);
  }
  
  // time printing cont.
  function padZero(number, width) {
    var paddedNumber = number.toString();
    while (paddedNumber.length < width) {
      paddedNumber = "0" + paddedNumber;
    }
    return paddedNumber;
  }