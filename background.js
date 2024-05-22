// background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "openPopup") {
    // Handle the message to open a popup or perform other actions
    console.log("Received openPopup message");
    // Optionally send a response back
    sendResponse({ status: "Message received" });
  }

  if (message.action === "toggleIframe") {
    // Handle the message to toggle the iframe
    console.log("Received toggleIframe message");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleIframe" });
    });
    sendResponse({ status: "Message sent to toggle iframe" });
  }
});
