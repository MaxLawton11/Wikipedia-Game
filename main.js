// ./buttons.js
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
    start();
  });

  // on try button
  tryButton.addEventListener("click", function () {
    guess();
  });  

  // on stop button press
  stopButton.addEventListener("click", function() {
    startMenu.classList.toggle("hidden");
    playMenu.classList.toggle("hidden");
    win();
  });
});


// ./game.js

var articleTitle; // track correct title

function start() {
  // run the main game after clearing
  var container = document.getElementById("textContainer");
  container.innerHTML = ""

  // update stauts
  updateStatus('loading')

  var numPossibleArticlesSelector = document.getElementById('numPossibleArticlesSelector');
  numPossibleArticlesSelector.disabled = true;
  var numPossibleArticles = Number(numPossibleArticlesSelector.value);
  var possibleArticles = randomArticles(numPossibleArticles);
  articleTitle = possibleArticles[Math.floor(Math.random()*possibleArticles.length)];
  console.log(articleTitle);

  run(articleTitle, possibleArticles);
}

function guess() {
  var guessSelector = document.getElementById('guessSelector');
  var guess = guessSelector.value;

  if (guess) {
    console.log(guess);
    disableCurrentGuess(guessSelector, guess);
    updateStatus('incorrect')

  }

  function correct() {}
  function incorrect() {

  }
}

function win() {
  stopAnimation()
  var container = document.getElementById("textContainer");
  container.innerHTML += "<br> <h2>You Win!</h2> <h3>The article was ()</h3> <h3>Clock: ()</h3>"
  scrollToBottom(container)
  stopClock();

  var numPossibleArticlesSelector = document.getElementById('numPossibleArticlesSelector');
  numPossibleArticlesSelector.disabled = false;
}

function quit() {
  stopAnimation();
  var container = document.getElementById("textContainer");
  container.innerHTML = "Quitted. Press start to try again..."
  stopClock();
  var numPossibleArticlesSelector = document.getElementById('numPossibleArticlesSelector');
  numPossibleArticlesSelector.disabled = false;
}