import moment from 'moment';
import { getEndingDate, getProductData } from './utils/helpers.js';

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  { type: 'GET_PARAMS', url: location.href },
  (response) => {
    console.log('Background response', response);

    if (response?.maxbid) {
      document.body.style.background = 'lightpink';
      // START Timer
      getEndingDate();
    }
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

chrome.storage.sync.get(null, (data) => {
  console.log('Storage: ', data);
});
