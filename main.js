document.addEventListener("DOMContentLoaded", function() {
  // define buttons and divs
  var playButton = document.getElementById("playButton");
  var stopButton = document.getElementById("stopButton");
  var startMenu = document.getElementById("startMenu");
  var playMenu = document.getElementById("playMenu");

  var timerInterval; // holds the reference to the setInterval timer

  // on play button press
  playButton.addEventListener("click", function() {
    startMenu.classList.toggle("hidden");
    playMenu.classList.toggle("hidden");

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
    stopClock()

  });
});