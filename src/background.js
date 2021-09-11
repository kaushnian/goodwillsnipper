chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const tabKey = `${sender.tab.url}-${sender.tab.id}`;

  chrome.storage.sync.get([tabKey], (tabData) => {
    const params = tabData[tabKey];

    if (!params) return;

    if (request.type === 'GET_PARAMS') {
      sendResponse(params);
    }

    if (request.type === 'MAKE_BID') {
      const newParams = { ...params, makeBid: true };
      chrome.storage.sync.set({ [tabKey]: newParams });
    }
  });

  return true;
});
