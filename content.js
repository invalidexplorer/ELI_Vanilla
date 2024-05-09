chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Slider Value:", message.sliderValue);
  console.log("Website URL:", message.url);
});
