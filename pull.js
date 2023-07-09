// Replace 'Article_Title' with the title of the Wikipedia article you want to fetch
var articleTitle = 'Winthrop, Massachusetts';

// URL for the crossorigin.me proxy
var proxyUrl = 'https://api.allorigins.win/get?url=';

// URL for the Wikipedia API
var apiUrl =
  'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles=' +
  encodeURIComponent(articleTitle) +
  '&explaintext=true&redirects=true';

// Making the request through the crossorigin.me proxy
fetch(proxyUrl + encodeURIComponent(apiUrl))
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Extracting the page content from the API response
    var response = JSON.parse(data.contents);
    var pages = response.query.pages;
    var pageId = Object.keys(pages)[0];
    var content = pages[pageId].extract;

    // Printing the extracted content
    console.log(content);
  })
  .catch(function(error) {
    console.log('Error:', error);
  });
