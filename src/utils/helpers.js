import moment from 'moment-timezone';

export function getEl(selector) {
  return document.querySelector(selector);
}

export function getProductData(text) {
  const lis = [...document.querySelectorAll('.product-data li')];

  const li = lis.find((el) => el.innerText.includes(text));

  return li.innerText.replace(text, '');
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
