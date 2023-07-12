// ./scripts/display.js

var currentIndex = 0;
var stopFlag = false;

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