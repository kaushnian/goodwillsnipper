import moment from 'moment-timezone';
import { ClassWatcher } from './class_watcher.js';

export function getEl(selector) {
  return document.querySelector(selector);
}

function getProductData(text) {
  const lis = [...document.querySelectorAll('.product-data li')];
  const li = lis.find((el) => el.innerText.includes(text));
  if (!li) {
    console.error(`ERROR: Product data "${text}" not found`);
    return 'Auction Ended';
  }
  return li.innerText.replace(text, '');
}

export function isAuctionActive() {
  return getProductData('Ends In:').trim() !== 'Auction Ended';
}

// Converts PST to users timezone
export function getEndingDate() {
  const dateTimeString = getProductData('Ends On:')
    .replace('Pacific Time', '')
    .trim();

  //const [date, time, ampm] = dateTimeString.split(' ');

  const formattedDate = moment(dateTimeString, ['M/D/YYYY h:mm A']).format(
    'YYYY-MM-DD HH:mm:ss'
  );
  const userTimezone = moment.tz.guess();

  return moment.tz(formattedDate, 'America/Los_Angeles').tz(userTimezone);
}

export function placeBid(maxbid, isDevmode) {
  const currentPrice = Number(getProductData('Current Price:$'));
  const incrementAmount = Number(getProductData('Bid Increment:$'));

  if (currentPrice > maxbid) {
    alert(`Current price ${currentPrice} is more than max bid ${maxbid}`);
    return;
  }

  // Set bid amount
  getEl('#bidAmount').value = currentPrice + incrementAmount;

  // FINAL ACTION. Place bid in the opened popup
  new ClassWatcher(getEl('#modal-bid'), 'in', () => {
    debugger;
    if (!isDevmode) {
      getEl('.btn-default').click();
    }
  });

  // Click the place bid button
  getEl('#placeBid').click();
}
