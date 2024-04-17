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

  var trys = document.getElementById("trys");

  if (guess) {
    if (guess === articleTitle) {
      win()
    }
    else {
      disableCurrentGuess(guessSelector, guess);
      updateStatus('incorrect');
      trys.innerHTML = Number(trys.innerHTML) + 1

    }
  }
}

function win() {
  stopAnimation()
  var container = document.getElementById("textContainer");
  var style = "style='padding: 0;'"
  var trys = document.getElementById("trys");
  // still need to get clock data here
  container.innerHTML += `<br> <h2 ${style}>You Win!</h2> <h3 ${style}>Article: ${articleTitle}</h3> <h3 ${style}> Incorrect trys: ${trys.innerHTML}</h3> <h3 ${style}>Clock: (no clock yet)</h3>`
  scrollToBottom(container)
  stopClock();

  var numPossibleArticlesSelector = document.getElementById('numPossibleArticlesSelector');
  numPossibleArticlesSelector.disabled = false;

  stopButton.innerHTML = "<strong>Reset</strong>" //pretend this is a reset button

}

function quit() {
  stopAnimation();
  var container = document.getElementById("textContainer");
  container.innerHTML = "Press start to play again..."
  stopClock();
  var numPossibleArticlesSelector = document.getElementById('numPossibleArticlesSelector');
  numPossibleArticlesSelector.disabled = false;
  stopButton.innerHTML = "<strong>Stop</strong>" // becuase this is run everytime we play this is where we reset
}

function fetchArticleContent(articleTitle) {
    return new Promise((resolve, reject) => {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=${articleTitle}&callback=processArticleContent`;
  
      // Create a script tag with the API URL
      const script = document.createElement('script');
      script.src = apiUrl;
  
      // Define the callback function
      window.processArticleContent = function (data) {
        // Extract the page content from the API response
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const content = pages[pageId].extract;
  
        // Remove the script tag
        script.remove();
  
        // Resolve the promise with the content
        resolve(content);
      };
  
      // Error handling if the script fails to load
      script.onerror = function () {
        // Remove the script tag
        script.remove();
  
        // Reject the promise with an error message
        reject(new Error('Failed to load article content'));
      };
  
      // Append the script tag to the document to initiate the request
      document.body.appendChild(script);
    });
  }
  
  
  var currentIndex = 0;
  var stopFlag = false;
  
  //setings import
  function displayWords(words, container) {
  
    // get timeing from settings
    var timeFactorSelector = document.getElementById("wordDelaySelector");
    var timeFactor = timeFactorSelector.value;
  
    // autoscroll
    var autoScrollCheckbox = document.getElementById("autoScroll");
    var autoScroll = Boolean(autoScrollCheckbox.checked);
  
      if (stopFlag) return; // If the stop flag is true, stop the animation
  
    if (currentIndex < words.length) {
      container.innerHTML += words[currentIndex] + " ";
  
      if (autoScroll) { scrollToBottom(container); }
  
      currentIndex++;
      setTimeout(function() {
        displayWords(words, container); // Pass the arguments when calling recursively
      }, timeFactor);
    }
  }
  
  // sets stop flag to tell display to stop
  function stopAnimation() {
      stopFlag = true; // Set the stop flag to true to stop the animation
    }
  
  // scroll to bottom
  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }
  
  
  function textProcessor(text) {
    var filteredText = text.replace(/==\s*\w+\s*==/g, '');
    return filteredText;
  }
  
  function randomStart(text) {
    var words = text.split(" ");
      var indexLimit = Math.floor(words.length * 0.7);
      var randomIndex = Math.floor(Math.random() * indexLimit);
      var remainingWords = words.splice(randomIndex + 1);
    console.log(remainingWords)
      return remainingWords
  }

  
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
  
  var timeoutId;
  
  function updateStatus(event) {
    var statusElement = document.getElementById('statusText');
    switch (event) {
      case 'loading' :
        statusElement.innerHTML = 'Article loading... Get ready!'
        break;
      case 'incorrect' :
        statusElement.innerHTML = 'Incorrect. Try again.'
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { updateStatus('playing'); }, 750);
       break;
      case 'playing' :
        statusElement.innerHTML = 'Playing! Make a guess!'
        break;
    }
  }
  
  function assignGuesses(options) {
    // this is when we want to relses the inputs
    var guessSelector = document.getElementById('guessSelector');
    var tryButton = document.getElementById('tryButton');
    guessSelector.disabled = false;
    tryButton.disabled = false;
  
    guessSelector.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
  }
  
  function disableCurrentGuess(guessSelector, optionToDisable) {
    for (var i = 0; i < guessSelector.options.length; i++) {
      if (guessSelector.options[i].value === optionToDisable) {
        guessSelector.options[i].disabled = true;
        guessSelector.selectedIndex = -1;
        break;
      }
    }
  }
  
  function testGuess(guess, articleTitle) {
    return (guess === articleTitle)
  }
  
  function randomArticles(numPossibleArticles) {
    // get articles from articles.js
    var selectedArticles = [];
    var totalElements = articles.length;
  
    while (selectedArticles.length < numPossibleArticles) {
      const randomIndex = Math.floor(Math.random() * totalElements);
      const randomArticle = articles[randomIndex];
      if (!selectedArticles.includes(randomArticle)) {
        selectedArticles.push(randomArticle);
      }
    }
    return selectedArticles;
  }
  
  function run(articleTitle, possibleArticles) {
    currentIndex = 0; // Reset the currentIndex
    stopFlag = false; // Reset the stopFlag
  
  fetchArticleContent(articleTitle)
    .then(content => {
      var processedContent = randomStart(content);
      // set up guesses
      assignGuesses(possibleArticles)
      startClock()
      updateStatus('playing')
      console.log(content)
      displayWords(processedContent, document.getElementById("textContainer"));
    })
    .catch(error => {
      console.error(error);
    });
  }
