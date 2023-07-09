var currentIndex = 0;
var timeFactor = 150; // Adjust the time factor (in milliseconds) for controlling the speed

export function displayWords(text, container) {
  var words = text.split(" ");
  if (currentIndex < words.length) {
    container.innerHTML += words[currentIndex] + " ";
    currentIndex++;
    setTimeout(displayWords, timeFactor);
  }
}