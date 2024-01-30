chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'summarize') {
    fetch('http://127.0.0.1:5000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ video_link: message.videoLink })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      sendResponse({ summary: data.summary });
    })
    .catch(error => {
      console.error('Error:', error);
      sendResponse({ error: 'Failed to summarize video' });
    });
    return true;
  }
});
