// ./scripts/guess.js

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