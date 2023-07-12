// ./scripts/status.js

var timeoutId;

function updateStatus(event) {
  var statusElement = document.getElementById('statusText');
  switch (event) {
    case 'loading' :
      statusElement.innerHTML = 'Article loading... Get ready!'
      break;
    case 'incorrect' :
      statusElement.innerHTML = 'Incorrect. Try again.'
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => { updateStatus('playing'); }, 750);
     break;
    case 'playing' :
      statusElement.innerHTML = 'Playing! Make a guess!'
      break;
  }
}