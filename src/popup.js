import './popup.css';
import { getEl } from './utils/helpers.js';

async function initPopup() {
  const maxbidInput = getEl('.maxbid-input');

  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const tabId = currentTab.id.toString();

  chrome.storage.sync.get([tabId], (tabData) => {
    if (tabData && tabData[tabId]) {
      maxbidInput.value = tabData[tabId];
    }
  });

  getEl('.button-start').addEventListener('click', async () => {
    chrome.storage.sync.set({ [tabId]: maxbidInput.value });
    /* messageToContent(
      { type: 'START', maxbid: maxbidInput.value },
      currentTab.id
    ); */
  });

  getEl('.button-stop').addEventListener('click', async () => {
    chrome.storage.sync.remove(tabId);
    maxbidInput.value = '';
    messageToContent({ type: 'STOP' }, currentTab.id);
  });
}

function messageToContent(message, tabId) {
  chrome.tabs.sendMessage(tabId, message, (response) => {
    //console.log('Popup: Response from content', response.message);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  initPopup();
});
