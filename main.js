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

    var guessSelector = document.getElementById('guessSelector');
    var tryButton = document.getElementById('tryButton');
    guessSelector.disabled = true;
    guessSelector.selectedIndex = -1;
    tryButton.disabled = true;

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

    var guessSelector = document.getElementById('guessSelector');
    var tryButton = document.getElementById('tryButton');
    guessSelector.disabled = true;
    guessSelector.selectedIndex = -1;
    tryButton.disabled = true;

    quit();
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
    if (guess === articleTitle) {
      win()
    }
    else {
      disableCurrentGuess(guessSelector, guess);
      updateStatus('incorrect')
    }
  }

  function correct() {}
  function incorrect() {

  }
}

function win() {
  stopAnimation()
  var container = document.getElementById("textContainer");
  container.innerHTML += `<br> <h2 class="game">You Win!</h2> <h3 class="game">Article: ${articleTitle}</h3> <h3 class="game">Clock: ()</h3>`
  scrollToBottom(container)
  stopClock();

  var numPossibleArticlesSelector = document.getElementById('numPossibleArticlesSelector');
  numPossibleArticlesSelector.disabled = false;

  stopButton.innerHTML = "<strong>Reset</strong>" //pretend this is a reset button

}

function quit() {
  stopAnimation();
  var container = document.getElementById("textContainer");
  container.innerHTML = "Quitted. Press start to try again..."
  stopClock();
  var numPossibleArticlesSelector = document.getElementById('numPossibleArticlesSelector');
  numPossibleArticlesSelector.disabled = false;
  stopButton.innerHTML = "<strong>Stop</strong>" // becuase this is run everytime we play this is where we reset
}