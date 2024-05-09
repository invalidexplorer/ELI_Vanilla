document.addEventListener("DOMContentLoaded", function () {
  const extensionIcon = document.createElement("img");
  extensionIcon.src = chrome.runtime.getURL("icons/icon.png");
  extensionIcon.style.cssText =
    "position: fixed; top: 20px; right: 20px; z-index: 100000; cursor: pointer; width: 256px; height: 256px;";
  document.body.appendChild(extensionIcon);

  extensionIcon.addEventListener("click", function () {
    fetch(chrome.runtime.getURL("popup.html"))
      .then((response) => response.text())
      .then((html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        document.body.appendChild(div);
      })
      .catch((error) => console.error("Error loading the popup:", error));
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Slider Value:", message.sliderValue);
  console.log("Website URL:", message.url);
});
