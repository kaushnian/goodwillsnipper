chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_PARAMS') {
    console.log(request);
    const tabKey = `${request.url}-${sender.tab.id}`;

    chrome.storage.sync.get([tabKey], (tabData) => {
      const params = tabData[tabKey];

      if (params) {
        sendResponse(params);
      }
    });
  }
  return true;
});
