// ./scrips/processor.js

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