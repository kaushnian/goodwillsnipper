export function getEl(selector) {
  return document.querySelector(selector);
}

export function getIncrementAmount() {
  const lis = [...document.querySelectorAll('.product-data li')];
  const incrementText = 'Bid Increment:$';

  const li = lis.find((el) => el.innerText.includes(incrementText));

  return Number(li.innerText.replace(incrementText, ''));
}

export function getAmount(selector) {
  return Number(getEl(selector).innerText.replace('$', ''));
}
