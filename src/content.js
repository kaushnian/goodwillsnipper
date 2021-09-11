import moment from 'moment';
import { getEndingDate, getProductData } from './utils/helpers.js';

// Communicate with background file by sending a message
chrome.runtime.sendMessage({ type: 'GET_PARAMS' }, (response) => {
  console.log('Background response', response);

  if (!response) return;

  //Make a bid!
  if (response.makeBid) {
    debugger;
  }

  // START Timer
  if (response.maxbid) {
    document.body.style.background = 'lightpink';
    const endingDate = getEndingDate().valueOf();
    const currentDate = moment().valueOf();

    // The site shows Ends in time 2 secons more.
    const timeSyncDelay = 2000;
    // Secons to make bid before ending.
    const triggerTime = 5000;
    const bidTimeMs = endingDate - currentDate - timeSyncDelay - triggerTime;

    console.log('RELOAD IN', bidTimeMs / 1000, ' s');

    setTimeout(() => {
      chrome.runtime.sendMessage({ type: 'MAKE_BID' });
      location.reload();
    }, bidTimeMs);
  }
});

chrome.storage.sync.get(null, (data) => {
  console.log('Storage: ', data);
});
