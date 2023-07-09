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
var timeFactor = 150; // Adjust the time factor (in milliseconds) for controlling the speed

function displayWords(text, container) {
  var words = text.split(" ");
  if (currentIndex < words.length) {
    container.innerHTML += words[currentIndex] + " ";
    currentIndex++;
    setTimeout(function() {
      displayWords(text, container); // Pass the arguments when calling recursively
    }, timeFactor);
  }
}


// ./processor.js
function textProcessor(text) {
  var filteredText = text.replace(/==\s*\w+\s*==/g, '');
  return filteredText;
}



// REAL CODE BELOW HERE
// CAN DO MUTI-SCRIPT WHEN WE ARN'T COCKBLOCKed BY CORS

document.addEventListener("DOMContentLoaded", function() {

  var container = document.getElementById("textContainer");
  var articleTitle = 'Winthrop, Massachusetts';


  fetchWikipediaArticle(articleTitle)
    .then(function(content) {
      // Do something with the content
      console.log(content)
      var processedContent = textProcessor(content);
      displayWords(processedContent, container);
    })
    .catch(function(error) {
      console.log('Error:', error);
    });

});