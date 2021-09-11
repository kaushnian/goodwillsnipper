import moment from 'moment';
import { getEndingDate, isAuctionActive } from './utils/helpers.js';

chrome.storage.sync.get(null, (data) => {
  console.log('Storage: ', data);
});

if (!isAuctionActive()) {
  console.log(1);
  chrome.runtime.sendMessage({ type: 'REMOVE_ITEM' });
} else {
  console.log(2);
  chrome.runtime.sendMessage({ type: 'GET_PARAMS' }, (response) => {
    console.log(3);
    console.log('Background response', response);

    if (!response) return;

    document.body.style.background = 'lightpink';

    if (response.makeBid) {
      //TODO Make a bid!

      // Remove item from storage
      chrome.runtime.sendMessage({ type: 'REMOVE_ITEM' });
    }

    // START Timer
    if (response.maxbid) {
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
}
