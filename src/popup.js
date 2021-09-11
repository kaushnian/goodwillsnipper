import './popup.css';
import { getEl } from './utils/helpers.js';

async function initPopup() {
  const maxbidInput = getEl('.maxbid-input');
  const startButton = getEl('.button-start');
  const stopButton = getEl('.button-stop');
  const clearButton = getEl('.button-clear');
  const reloadButton = getEl('.button-reload');

  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const url = currentTab.url;
  const tabId = currentTab.id;
  const tabKey = `${url}-${tabId}`;

  // Set initial state from storage.
  chrome.storage.sync.get([tabKey], (tabData) => {
    if (tabData && tabData[tabKey]) {
      maxbidInput.value = tabData[tabKey].maxbid;
      startButton.setAttribute('disabled', '');
      maxbidInput.setAttribute('disabled', '');
    }
  });

  startButton.addEventListener('click', async () => {
    chrome.storage.sync.set({
      [tabKey]: {
        maxbid: maxbidInput.value,
        tabId,
        url,
      },
    });
    startButton.setAttribute('disabled', '');
    maxbidInput.setAttribute('disabled', '');
    chrome.tabs.reload(tabId);
  });

  stopButton.addEventListener('click', async () => {
    chrome.storage.sync.remove(tabKey);
    maxbidInput.value = '';
    startButton.removeAttribute('disabled');
    maxbidInput.removeAttribute('disabled');
    chrome.tabs.reload(tabId);
  });

  clearButton.addEventListener('click', async () => {
    chrome.storage.sync.clear();
    maxbidInput.value = '';
    startButton.removeAttribute('disabled');
    maxbidInput.removeAttribute('disabled');
  });

  reloadButton.addEventListener('click', async () => {
    chrome.runtime.reload();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  initPopup();
});
