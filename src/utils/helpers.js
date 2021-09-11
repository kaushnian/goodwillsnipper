import moment from 'moment-timezone';

export function getEl(selector) {
  return document.querySelector(selector);
}

export function getProductData(text) {
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

export function getIncrementAmount() {
  return Number(getProductData('Bid Increment:$'));
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

export function getCurrentPrice(selector) {
  return Number(getEl(selector).innerText.replace('$', ''));
}
