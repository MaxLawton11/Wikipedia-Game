document.addEventListener("DOMContentLoaded", function() {
  // define buttons and divs
  var playButton = document.getElementById("playButton");
  var stopButton = document.getElementById("stopButton");
  var tryButton = document.getElementById("tryButton");
  var startMenu = document.getElementById("startMenu");
  var playMenu = document.getElementById("playMenu");

  // on play button press
  playButton.addEventListener("click", function() {
    startMenu.classList.toggle("hidden");
    playMenu.classList.toggle("hidden");

    // run the main game after clearing
    var container = document.getElementById("textContainer");
    container.innerHTML = ""

    // update stauts
    updateStatus('loading')

    var numPossibleArticlesSelector = document.getElementById('numPossibleArticlesSelector');
    var numPossibleArticles = Number(numPossibleArticlesSelector.value);
    var options = randomArticles(numPossibleArticles);

    // run main game script
    run(options)
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

  // on try button
  tryButton.addEventListener("click", function () {

  });
});