// Replace 'Article_Title' with the title of the Wikipedia article you want to fetch
var articleTitle = 'Article_Title';

// URL for the MediaWiki API
var apiUrl = 'https://en.wikipedia.org/w/api.php';

// Parameters for the API request
var params = {
  action: 'query',
  prop: 'extracts',
  format: 'json',
  titles: articleTitle,
  explaintext: true,
  redirects: true
};

// Constructing the API URL with the parameters
var apiURL = apiUrl + '?' + new URLSearchParams(params);

// Making the API request
fetch(apiURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Extracting the page content from the API response
    var pages = data.query.pages;
    var pageId = Object.keys(pages)[0];
    var content = pages[pageId].extract;

    // Printing the extracted content
    console.log(content);
  })
  .catch(function(error) {
    console.log('Error:', error);
  });
