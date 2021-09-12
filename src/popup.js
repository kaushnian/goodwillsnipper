import './popup.css';
import { getEl } from './utils/helpers.js';

async function initPopup() {
  const maxbidInput = getEl('.maxbid-input');
  const startButton = getEl('.button-start');
  const stopButton = getEl('.button-stop');
  const clearButton = getEl('.button-clear');
  const devmodeCheckbox = getEl('#devmode-checkbox');

  const app = getEl('.app');

  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const url = currentTab.url;
  const tabId = currentTab.id;
  const tabKey = `${url}-${tabId}`;

  // Set initial state from storage.
  chrome.storage.sync.get([tabKey, 'isDevmode'], (state) => {
    console.log(state);
    if (!state) return;

    if (state[tabKey]) {
      maxbidInput.value = state[tabKey].maxbid;
      hide(startButton);
      disable(maxbidInput);
      show(stopButton);
    }

    if (state.isDevmode) {
      devmodeCheckbox.checked = state.isDevmode;
      app.classList.add('app-devmode');
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

  startButton.addEventListener('click', () => {
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

  stopButton.addEventListener('click', () => {
    chrome.storage.sync.remove(tabKey);
    maxbidInput.value = '';
    show(startButton);
    hide(stopButton);
    enable(maxbidInput);
    maxbidInput.focus();
    chrome.tabs.reload(tabId);
  });

  clearButton.addEventListener('click', () => {
    chrome.storage.sync.clear();
    maxbidInput.value = '';
    show(startButton);
    enable(maxbidInput);
  });

  devmodeCheckbox.addEventListener('change', () => {
    chrome.storage.sync.set({ ['isDevmode']: devmodeCheckbox.checked });
    if (devmodeCheckbox.checked) {
      app.classList.add('app-devmode');
    } else {
      app.classList.remove('app-devmode');
    }
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
