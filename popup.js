// Option 1: Using DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const summarizeButton = document.getElementById('summarizeButton');
  summarizeButton.addEventListener('click', () => {
    const videoLink = document.getElementById('videoLink').value;
    chrome.runtime.sendMessage({ action: 'summarize', videoLink }, response => {
      if (response.error) {
        document.getElementById('summary').innerText = response.error;
      } else {
        document.getElementById('summary').innerText = response.summary;
      }
    });
  });
});

// Option 2: Moving the script to the end of popup.html
// (Alternatively, move the <script src="popup.js"></script> tag to the end of the <body> section in popup.html)
