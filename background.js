// background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "openPopup") {
    // Handle the message to open a popup or perform other actions
    console.log("Received openPopup message");
    // Optionally send a response back
    sendResponse({ status: "Message received" });
  }
});
