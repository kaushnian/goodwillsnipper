// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for messages
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'START') {
    console.log(`START: Maxbid is ${request.maxbid}`);

    document.body.style.background = 'lightpink';
  }

  if (request.type === 'STOP') {
    console.log('STOP');

    document.body.style.background = 'white';
  }

  sendResponse({ message: 'Maxbid received' });
  return true;
});
