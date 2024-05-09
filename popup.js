document.addEventListener("DOMContentLoaded", function () {
  let s = document.createElement("style");
  document.head.appendChild(s);

  let itr = document.getElementById("slider");
  itr.addEventListener("input", () => {
    // Calculate the percentage based on the slider's current value
    let percentage = ((itr.value - 1) / 4) * 100;
    s.textContent = `.slider {
    background: linear-gradient(to right, #117A6F ${percentage}%, #D9D9D9 ${percentage}%)
  }`;
  });

  const previewButton = document.querySelector(".button.rounded-button");
  const rephraseButton = document.querySelector(
    ".button.rounded-button.green-button"
  );

  previewButton.addEventListener("click", function () {
    handlePreview();
  });

  rephraseButton.addEventListener("click", function () {
    handleRephrase();
  });
});

function handlePreview() {
  console.log("Preview clicked");
  const sliderValue = document.getElementById("slider").value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url; // URL of the current tab
    const message = { sliderValue, url: url };

    // Send message to the content script
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

function handleRephrase() {
  console.log("Preview clicked");
  const sliderValue = document.getElementById("slider").value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url; // URL of the current tab
    const message = { sliderValue, url: url };

    // Send message to the content script
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
  console.log("Rephrase clicked");
  // Add your code for Rephrase here
}
