import './popup.css';
import { getEl } from './utils/helpers.js';

let maxbidInput;

function initPopup() {
  maxbidInput = getEl('.maxbid-input');

  getEl('.button-start').addEventListener('click', () => {
    messageToContent({ type: 'START', maxbid: maxbidInput.value });
  });

  getEl('.button-stop').addEventListener('click', () => {
    messageToContent({ type: 'STOP' });
  });
}

function messageToContent(message) {
  // Communicate with content script of
  // active tab by sending a message
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const [tab] = tabs;

    chrome.tabs.sendMessage(tab.id, message, (response) => {
      console.log('Popup: Response from content', response.message);
    });
  });
}

document.addEventListener('DOMContentLoaded', initPopup);

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Pop. I am from Popup.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);
