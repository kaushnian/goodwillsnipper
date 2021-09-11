export function getEl(selector) {
  return document.querySelector(selector);
}

export function getProductData(text) {
  const lis = [...document.querySelectorAll('.product-data li')];
  const incrementText = 'Bid Increment:$';

  const li = lis.find((el) => el.innerText.includes(text));

  return li.innerText.replace(text, '');
}

export function getIncrementAmount() {
  return Number(getProductData('Bid Increment:$'));
}

export function getEndingDate() {
  const dateTimeString = getProductData('Available Until:')
    .replace('Pacific Time', '')
    .trim();
  console.log(dateTimeString);
  debugger;
  return new Date(Date.UTC(dateTimeString));
}

export function getCurrentPrice(selector) {
  return Number(getEl(selector).innerText.replace('$', ''));
}
