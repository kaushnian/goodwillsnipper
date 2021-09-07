import './popup.css';
import { getEl } from './utils/helpers.js';

async function initPopup() {
  const maxbidInput = getEl('.maxbid-input');

  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  getEl('.button-start').addEventListener('click', async () => {
    messageToContent(
      { type: 'START', maxbid: maxbidInput.value },
      currentTab.id
    );
  });

  getEl('.button-stop').addEventListener('click', async () => {
    messageToContent({ type: 'STOP' }, currentTab.id);
  });
}

function messageToContent(message, tabId) {
  chrome.tabs.sendMessage(tabId, message, (response) => {
    //console.log('Popup: Response from content', response.message);
  });
}

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

document.addEventListener('DOMContentLoaded', async () => {
  initPopup();
});
