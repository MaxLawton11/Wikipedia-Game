// ./scripts/pull.js

function fetchArticleContent(articleTitle) {
    return new Promise((resolve, reject) => {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=${articleTitle}&callback=processArticleContent`;
  
      // Create a script tag with the API URL
      const script = document.createElement('script');
      script.src = apiUrl;
  
      // Define the callback function
      window.processArticleContent = function (data) {
        // Extract the page content from the API response
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const content = pages[pageId].extract;
  
        // Remove the script tag
        script.remove();
  
        // Resolve the promise with the content
        resolve(content);
      };
  
      // Error handling if the script fails to load
      script.onerror = function () {
        // Remove the script tag
        script.remove();
  
        // Reject the promise with an error message
        reject(new Error('Failed to load article content'));
      };
  
      // Append the script tag to the document to initiate the request
      document.body.appendChild(script);
    });
  }