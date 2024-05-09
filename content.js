// Wait for the window to load fully
window.onload = function () {
  const extensionIcon = document.createElement("img");
  extensionIcon.src = chrome.runtime.getURL("icons/icon.png");
  extensionIcon.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100000; // High z-index to ensure visibility
    cursor: pointer;
    width: 200px;
    height: 200px;
    shadow: 0 0 8px rgba(0,0,0,0.5); // Optional: adds shadow for better visibility
  `;

  // Append the icon to the body
  document.body.appendChild(extensionIcon);

  // Add event listener for clicks to open the popup
  extensionIcon.addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "openPopup" }, function (response) {
      console.log(response.status);
    });
  });
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Slider Value:", message.sliderValue);
  console.log("Website URL:", message.url);
});
