import './popup.css';
import { getEl } from './utils/helpers.js';

async function initPopup() {
  const maxbidInput = getEl('.maxbid-input');

  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const url = currentTab.url;
  const tabId = currentTab.id;
  const tabKey = `${url}-${tabId}`;

  chrome.storage.sync.get([tabKey], (tabData) => {
    if (tabData && tabData[tabKey]) {
      maxbidInput.value = tabData[tabKey].maxbid;
    }
  });

  getEl('.button-start').addEventListener('click', async () => {
    chrome.storage.sync.set({
      [tabKey]: {
        maxbid: maxbidInput.value,
        tabId,
        url,
      },
    });
    chrome.tabs.reload(tabId);
  });

  getEl('.button-stop').addEventListener('click', async () => {
    chrome.storage.sync.remove(tabKey);
    maxbidInput.value = '';
    messageToContent({ type: 'STOP' }, currentTab.id);
  });

  getEl('.button-clear').addEventListener('click', async () => {
    chrome.storage.sync.clear();
    maxbidInput.value = '';
  });

  getEl('.button-reload').addEventListener('click', async () => {
    chrome.runtime.reload();
  });
}

function messageToContent(message, tabId) {
  chrome.tabs.sendMessage(tabId, message, (response) => {});
}

document.addEventListener('DOMContentLoaded', async () => {
  initPopup();
});
