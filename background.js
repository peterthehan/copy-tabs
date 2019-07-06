chrome.browserAction.onClicked.addListener(_ => {
  chrome.tabs.query({ currentWindow: true }, tabs => {
    if (!tabs.length) return;
    prompt('', tabs.map(tab => tab.url).join('\n'));
  });
});
