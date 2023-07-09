document.addEventListener("DOMContentLoaded", function() {
  // define buttons and divs
  var playButton = document.getElementById("playButton");
  var stopButton = document.getElementById("stopButton");
  var startMenu = document.getElementById("startMenu");
  var playMenu = document.getElementById("playMenu");
  var clock = document.getElementById("clock");

  var timerInterval; // holds the reference to the setInterval timer

  // on play button press
  playButton.addEventListener("click", function() {
    startMenu.classList.toggle("hidden");
    playMenu.classList.toggle("hidden");

    // start the clock timer
    var startTime = Date.now(); // Record the start time
    timerInterval = setInterval(function() {
      var currentTime = Date.now();
      var elapsedTime = currentTime - startTime;
      var formattedTime = formatTime(elapsedTime);
      clock.textContent = formattedTime;
    }, 10);

    // run the main game after clearing
    var container = document.getElementById("textContainer");
    container.innerHTML = ""
    run()

  });

  // on stop button press
  stopButton.addEventListener("click", function() {
    startMenu.classList.toggle("hidden");
    playMenu.classList.toggle("hidden");
  
    stopAnimation()
    var container = document.getElementById("textContainer");
    container.innerHTML = "Quitted. Press start to try again..."

    // stop the clock timer
    clearInterval(timerInterval);
    clock.textContent = "0:00:000";
  });

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

});