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
      displayWords(processedContent, container);
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}