document.addEventListener("DOMContentLoaded", function() {
  // define buttons and divs
  var playButton = document.getElementById("playButton");
  var stopButton = document.getElementById("stopButton");
  var tryButton = document.getElementById("tryButton");
  var startMenu = document.getElementById("startMenu");
  var playMenu = document.getElementById("playMenu");

  var articleTitle; // track correct title

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
    var possibleArticles = randomArticles(numPossibleArticles);
    articleTitle = possibleArticles[Math.floor(Math.random()*possibleArticles.length)];
    console.log(articleTitle)

    run(articleTitle, possibleArticles)
  });



  // on try button
  tryButton.addEventListener("click", function () {
    var guessSelector = document.getElementById('guessSelector');
    var guess = guessSelector.value;

    if (guess) {
      console.log(guess)
      disableCurrentGuess(guessSelector, guess)
    }
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