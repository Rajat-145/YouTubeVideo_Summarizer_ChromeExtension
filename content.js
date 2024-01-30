chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'extractVideoLink') {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      sendResponse({ videoLink: videoElement.src });
    } else {
      sendResponse({ error: 'No video found' });
    }
    return true;
  }
});
