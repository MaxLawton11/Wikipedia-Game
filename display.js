var text = "Hello, this is a sample text.";
var words = text.split(" ");
var container = document.getElementById("textContainer");
var currentIndex = 0;
var timeFactor = 150; // Adjust the time factor (in milliseconds) for controlling the speed

function displayWords() {
  if (currentIndex < words.length) {
    container.innerHTML += words[currentIndex] + " ";
    currentIndex++;
    setTimeout(displayWords, timeFactor);
  }
}