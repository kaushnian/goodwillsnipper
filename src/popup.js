import './popup.css';

// We will make use of Storage API to get and store `count` value
// More information on Storage API can we found at
// https://developer.chrome.com/extensions/storage

// To get storage access, we have to mention it in `permissions` property of manifest.json file
// More information on Permissions can we found at
// https://developer.chrome.com/extensions/declare_permissions
const storage = {
  get: (cb) => {
    chrome.storage.sync.get(['count'], (result) => {
      cb(result.count);
    });
  },
  set: (value, cb) => {
    chrome.storage.sync.set(
      {
        count: value,
      },
      () => {
        cb();
      }
    );
  },
};

function setupCounter(initialValue = 0) {
  document.getElementById('counter').innerHTML = initialValue;

  document.querySelector('.start-btn').addEventListener('click', () => {
    updateMaxbid({
      type: 'START',
    });
  });

  document.getElementById('stop-btn').addEventListener('click', () => {
    updateMaxbid({
      type: 'STOP',
    });
  });
}

function updateMaxbid({ type }) {
  storage.get((count) => {
    let newCount;

    if (type === 'START') {
      newCount = count + 1;
    } else if (type === 'STOP') {
      newCount = count - 1;
    } else {
      newCount = count;
    }

    storage.set(newCount, () => {
      document.getElementById('counter').innerHTML = newCount;

      // Communicate with content script of
      // active tab by sending a message
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        chrome.tabs.sendMessage(
          tab.id,
          {
            type: 'COUNT',
            payload: {
              count: newCount,
            },
          },
          (response) => {
            console.log('Current count value passed to content file');
          }
        );
      });
    });
  });
}

function restoreCounter() {
  // Restore count value
  storage.get((count) => {
    if (typeof count === 'undefined') {
      // Set counter value as 0
      storage.set(0, () => {
        setupCounter(0);
      });
    } else {
      setupCounter(count);
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreCounter);

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
