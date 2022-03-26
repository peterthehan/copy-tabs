function toPromise(api) {
  return (...args) => {
    return new Promise((resolve) => {
      api(...args, resolve);
    });
  };
}

const queryTabs = toPromise(chrome.tabs.query);

chrome.action.onClicked.addListener(async () => {
  const [currentTab] = await queryTabs({ currentWindow: true, active: true });
  const tabs = await queryTabs({ currentWindow: true });

  const tabsString = tabs.map((tab) => tab.url).join("\n");

  chrome.tabs.sendMessage(
    currentTab.id,
    {
      message: "copy-tabs",
      textToCopy: tabsString,
    },
    () =>
      chrome.notifications.create({
        type: "basic",
        iconUrl: "assets/clipboard_48.png",
        title: `Copied ${tabs.length} tab URL${tabs.length === 1 ? "" : "s"}!`,
        message: tabsString,
      })
  );
});
