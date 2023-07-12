// ./pull.js
// Wikipedia API endpoint
const apiUrl = 'https://en.wikipedia.org/w/api.php';

// Function to fetch Wikipedia article content
async function fetchArticleContent(articleTitle) {
  try {
    // Create a URL for the API request
    const url = new URL(apiUrl);
    url.searchParams.append('action', 'query');
    url.searchParams.append('format', 'json');
    url.searchParams.append('prop', 'extracts');
    url.searchParams.append('exintro', '');
    url.searchParams.append('explaintext', '');
    url.searchParams.append('titles', articleTitle);

    // Make the API request
    const response = await fetch(url);
    const data = await response.json();

    // Extract the page content from the API response
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    let content = pages[pageId].extract;

    // Remove headings and hover tips
    content = content.replace(/==+.+?==+/g, ''); // Remove headings
    content = content.replace(/{{.+?}}/g, ''); // Remove hover tips

    // Extract only words from the content
    const words = content.match(/\b\w+\b/g).join(' ');

    return words;
  } catch (error) {
    console.error('Error fetching article content:', error);
  }
}

// ./display.js
var currentIndex = 0;
var stopFlag = false;


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

// sets stop flag to tell display to stop
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

// ./status.js

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

// ./guess.js

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

// ./articles.js

function randomArticles(numPossibleArticles) {
  const articles = [
    "Aquila (constellation)",
    "Greek alphabet",
    "Sushi",
    "Napoleon",
    "Solar power",
    "Renaissance",
    "Sydney Opera House",
    "Albert Einstein",
    "Tennis",
    "Great Barrier Reef",
    "Vincent van Gogh",
    "Statue of Liberty",
    "Artificial intelligence",
    "The Beatles",
    "Mount Everest",
    "Maya civilization",
    "Leonardo da Vinci",
    "Black hole",
    "Marie Curie",
    "Taj Mahal",
    "Global warming",
    "World War II",
    "Great Wall of China",
    "DNA",
    "Queen Elizabeth II",
    "Ancient Egypt",
    "Pablo Picasso",
    "Internet",
    "Titanic",
    "Buddhism",
    "World Cup",
    "Albert Einstein",
    "Viking Age",
    "New York City",
    "Ancient Greece",
    "Mona Lisa",
    "World War I",
    "Steve Jobs",
    "Michelangelo",
    "Space exploration",
    "Martin Luther King Jr.",
    "Big Bang",
    "United Nations",
    "Roman Empire",
    "Elvis Presley",
    "African elephants",
    "Charles Darwin",
    "Hubble Space Telescope",
    "Wolfgang Amadeus Mozart",
    "Moon landing",
    "Hinduism",
    "Internet of things",
    "Amsterdam",
    "Leonardo DiCaprio",
    "Nikola Tesla",
    "Machu Picchu",
    "Human rights",
    "The Simpsons",
    "Gravity",
    "Walt Disney",
    "Climate change",
    "Penguins",
    "Sigmund Freud",
    "Mount Kilimanjaro",
    "Ancient Rome",
    "Virtual reality",
    "Alberto Santos-Dumont",
    "Frida Kahlo",
    "Apollo 11",
    "Barack Obama",
    "Mars",
    "The Great Gatsby",
    "Venice",
    "Evolution",
    "Marilyn Monroe",
    "Abraham Lincoln",
    "SpaceX",
    "Polar bear",
    "Johannes Kepler",
    "Paris",
    "Steve Jobs",
    "Black Mirror",
    "Jazz",
    "Pompeii",
    "Psychology",
    "Stephen Hawking",
    "Climate change denial",
    "Vincent van Gogh's art",
    "Neuschwanstein Castle",
    "Romeo and Juliet",
    "Leonardo da Vinci's inventions",
    "Galapagos Islands",
    "Google",
    "Mount Vesuvius"
  ];  
  
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

// ./game.js

function run(articleTitle, possibleArticles) {
  currentIndex = 0; // Reset the currentIndex
  stopFlag = false; // Reset the stopFlag

fetchArticleContent(articleTitle)
  .then(words => {
    var processedContent = content //textProcessor(content);
    // set up guesses
    assignGuesses(possibleArticles)
    startClock()
    updateStatus('playing')
    displayWords(processedContent, document.getElementById("textContainer"));
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
  
}