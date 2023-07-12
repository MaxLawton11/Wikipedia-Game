// ./scripts/game.js

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