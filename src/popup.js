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
      hide(startButton);
      disable(maxbidInput);
      show(stopButton);
    }
  });

  maxbidInput.addEventListener('keyup', (event) => {
    if (maxbidInput.value) {
      enable(startButton);
    } else {
      disable(startButton);
    }
    if (event.keyCode === 13) {
      startButton.click();
      stopButton.focus();
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
    hide(startButton);
    disable(maxbidInput);
    show(stopButton);
    chrome.tabs.reload(tabId);
  });

  stopButton.addEventListener('click', async () => {
    chrome.storage.sync.remove(tabKey);
    maxbidInput.value = '';
    show(startButton);
    hide(stopButton);
    enable(maxbidInput);
    maxbidInput.focus();
    chrome.tabs.reload(tabId);
  });

  clearButton.addEventListener('click', async () => {
    chrome.storage.sync.clear();
    maxbidInput.value = '';
    show(startButton);
    enable(maxbidInput);
  });

  reloadButton.addEventListener('click', async () => {
    chrome.runtime.reload();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  initPopup();
});

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function disable(element) {
  element.setAttribute('disabled', '');
}

function enable(element) {
  element.removeAttribute('disabled');
}
