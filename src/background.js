chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_MAXBID') {
    const tabId = sender.tab.id.toString();

    console.log('Bac tabId', tabId);

    chrome.storage.sync.get([tabId], (tabData) => {
      const maxbid = tabData[tabId];

      console.log('Bac maxbid from storage', maxbid);
      if (maxbid) {
        sendResponse({ maxbid });
      }
    });
  }
  return true;
});
