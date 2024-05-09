document.addEventListener("DOMContentLoaded", function () {
  const extensionIcon = document.createElement("img");
  extensionIcon.src = chrome.runtime.getURL("icons/icon.png");
  extensionIcon.style.cssText =
    "position: fixed; top: 20px; right: 20px; z-index: 100000; cursor: pointer; width: 128px; height: 128px;";
  document.body.appendChild(extensionIcon);

  const iframe = document.createElement("iframe");
  iframe.style.cssText =
    "display: none; position: fixed; top: 180px; right: 20px; z-index: 100001;  width: 450px; height: 600px; border: none;";
  document.body.appendChild(iframe);

  extensionIcon.addEventListener("click", function () {
    iframe.style.display = iframe.style.display === "none" ? "block" : "none";
    if (!iframe.src) {
      // Setting the src of the iframe to your extension's HTML file
      iframe.src = chrome.runtime.getURL("popup.html");
      // Load the CSS and JS through the HTML file as usual
    }
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Slider Value:", message.sliderValue);
  console.log("Website URL:", message.url);
});
