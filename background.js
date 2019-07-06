// https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

chrome.browserAction.onClicked.addListener(_ => {
  chrome.tabs.query({ currentWindow: true }, tabs => {
    const tabsString = tabs.map(tab => tab.url).join('\n');
    copyToClipboard(tabsString);

    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'assets/clipboard_48.png',
      title: `Copied ${tabs.length} tab URL${tabs.length === 1 ? '' : 's'}!`,
      message: tabsString
    });
  });
});
