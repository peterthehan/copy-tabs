// https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

chrome.runtime.onMessage.addListener(async (request, _, sendResponse) => {
  if (request.message === "copy-tabs") {
    copyToClipboard(request.textToCopy);
  }

  sendResponse();
});
