import { fetchWikipediaArticle } from './pull.js';
import { displayWords } from './display';

var container = document.getElementById("textContainer");

var articleTitle = 'Winthrop, Massachusetts';

fetchWikipediaArticle(articleTitle)
  .then(function(content) {
    // Do something with the content
    displayWords(content, container);
  })
  .catch(function(error) {
    console.log('Error:', error);
  });