document.getElementById("submitBtn").addEventListener("click", function () {
  const sliderValue = document.getElementById("slider").value;

  // Query the current active tab to get the URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url; // URL of the current tab
    const message = { sliderValue, url: url };

    // Send message to the content script
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
});
