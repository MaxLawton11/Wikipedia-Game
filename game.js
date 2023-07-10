// ./pull.js
function fetchWikipediaArticle(title) {
    // URL for the crossorigin.me proxy
    var proxyUrl = 'https://api.allorigins.win/get?url=';
  
    // URL for the Wikipedia API
    var apiUrl =
      'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles=' +
      encodeURIComponent(title) +
      '&explaintext=true&redirects=true';
  
    // Making the request through the crossorigin.me proxy
    return fetch(proxyUrl + encodeURIComponent(apiUrl))
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Extracting the page content from the API response
        var response = JSON.parse(data.contents);
        var pages = response.query.pages;
        var pageId = Object.keys(pages)[0];
        var content = pages[pageId].extract;
  
        return content;
      });
  }

// ./display.js
var currentIndex = 0;
var stopFlag = false;
var autoScroll = true; // add to settings later


//setings import

function displayWords(text, container) {

  // get timeing from settings
  var timeFactorSelector = document.getElementById("wordDelaySelector");
  var timeFactor = timeFactorSelector.value;

  // autoscroll
  var autoScrollCheckbox = document.getElementById("autoScroll");
  var autoScroll = Boolean(autoScrollCheckbox.checked);

	if (stopFlag) return; // If the stop flag is true, stop the animation
  var words = text.split(" ");
	words = randomStart(words)
  if (currentIndex < words.length) {
    container.innerHTML += words[currentIndex] + " ";

    if (autoScroll) { scrollToBottom(container); }

    currentIndex++;
    setTimeout(function() {
      displayWords(text, container); // Pass the arguments when calling recursively
    }, timeFactor);
  }
}

function stopAnimation() {
    stopFlag = true; // Set the stop flag to true to stop the animation
  }

// scroll to bottom
function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

// ./processor.js
function textProcessor(text) {
  var filteredText = text.replace(/==\s*\w+\s*==/g, '');
  return filteredText;
}

function randomStart(words) {
	var indexLimit = Math.floor(words.length * 0.7);
	var randomIndex = Math.floor(Math.random() * indexLimit);
	var remainingWords = words.splice(randomIndex + 1);
	return remainingWords
}

// ./clock.js

function startClock(clockElement) {
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

// ./game.js

function run() {
  currentIndex = 0; // Reset the currentIndex
  stopFlag = false; // Reset the stopFlag

	var container = document.getElementById("textContainer");

	var possibleTitles = Array('Winthrop, Massachusetts', 'Gilgamesh', 'GitHub', 'King Arthur');
  var articleTitle = possibleTitles[Math.floor(Math.random()*possibleTitles.length)];
  
  fetchWikipediaArticle(articleTitle)
    .then(function(content) {
      // Do something with the content
      var processedContent = textProcessor(content);
      console.log(processedContent);
      startClock()
      displayWords(processedContent, container);
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}