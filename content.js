const rephraseAPICall =
  "https://run.mocky.io/v3/b3df34a9-d0d7-40ea-9686-36f2e3da4142";
const iframe = document.createElement("iframe");
iframe.style.cssText =
  "display: none; position: fixed; top: 180px; right: 20px; z-index: 100001; width: 450px; height: 600px; border: none; resize: both; overflow: auto;";

document.addEventListener("DOMContentLoaded", function () {
  const extensionIcon = document.createElement("img");
  extensionIcon.src = chrome.runtime.getURL("icons/icon.png");
  extensionIcon.style.cssText =
    "position: fixed; top: 20px; right: 20px; z-index: 100000; cursor: pointer; width: 128px; height: 128px;";
  document.body.appendChild(extensionIcon);

  document.body.appendChild(iframe);

  extensionIcon.addEventListener("click", function () {
    iframe.style.display = iframe.style.display === "none" ? "block" : "none";
    if (!iframe.src) {
      iframe.src = chrome.runtime.getURL("popup.html");
    }
  });

  injectFullscreenPopup();
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "toggleIframe") {
    iframe.style.display = iframe.style.display === "none" ? "block" : "none";
    if (!iframe.src) {
      iframe.src = chrome.runtime.getURL("popup.html");
    }
  }

  console.log("Slider Value:", message.sliderValue);
  console.log("Website URL:", message.url);
  console.log("Website HTML:", message.html);
});

function injectFullscreenPopup() {
  const popupHTML = `
    <div id="fullscreen-popup" class="fullscreen-popup">
      <div class="fullscreen-content" id="fullscreen-content"></div>
      <div id="fullscreen-loading" class="fullscreen-loading">
        <p>Rephrasing....</p>
        <div class="progress-bar">
          <div class="progress"></div>
        </div>
      </div>
      <div class="fullscreen-close" title="Close">
      <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 736 215 1000q-12 12-29.5 12T156 1000q-12-12-12-29.5t12-29.5l264-264-264-264q-12-12-12-29.5t12-29.5q12-12 29.5-12T215 384l265 264 264-264q12-12 29.5-12t29.5 12q12 12 12 29.5t-12 29.5L540 672l264 264q12 12 12 29.5t-12 29.5q-12 12-29.5 12T739 1000L480 736Z"/></svg>
    </div>
  </div>
  `;

  const popupStyle = `
  .fullscreen-popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(17, 122, 111, 0.8);
    z-index: 100001;
    color: white;
    overflow: auto;
    padding: 20px;
    resize: both;
  }
  .fullscreen-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    cursor: pointer;
    background-color: white;
    color: black;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fullscreen-content {
    display: none;
    padding: 20px;
    background-color: white;
    color: black;
    border-radius: 10px;
    max-width: 80%;
    margin: 100px auto;
  }
  .fullscreen-loading {
    display: none;
    text-align: center;
    padding: 20px;
  }
  .fullscreen-loading p {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .progress-bar {
    width: 80%;
    background-color: #ddd;
    border-radius: 20px;
    margin: 0 auto;
  }
  .progress {
    width: 0;
    height: 20px;
    background-color: #117A6F;
    border-radius: 20px;
    animation: loading 2s infinite;
  }
  @keyframes loading {
    0% {
      width: 0;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
  `;

  document.addEventListener("DOMContentLoaded", function () {
    const style = document.createElement("style");
    style.textContent = popupStyle;
    document.head.appendChild(style);

    const div = document.createElement("div");
    div.innerHTML = popupHTML;
    document.body.appendChild(div);

    const closeButton = document.querySelector(".fullscreen-close");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        document.getElementById("fullscreen-popup").style.display = "none";
      });
    }
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "rephraseContent") {
    const { sliderValue, url, isADHD, html } = message;

    const fullscreenPopup = document.getElementById("fullscreen-popup");
    const fullscreenContent = document.getElementById("fullscreen-content");
    const fullscreenLoading = document.getElementById("fullscreen-loading");

    if (!fullscreenPopup || !fullscreenContent || !fullscreenLoading) {
      console.error("Fullscreen popup elements are missing!");
      return;
    }

    fullscreenLoading.style.display = "block";
    fullscreenContent.style.display = "none";
    fullscreenPopup.style.display = "block";

    fetch(rephraseAPICall, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        level: sliderValue,
        url: url,
        isADHD: isADHD,
        html: html,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        const markdown = data.rephrasedText;
        if (markdown) {
          fullscreenContent.innerHTML = marked.parse(markdown);
        } else {
          fullscreenContent.textContent = "No content received.";
        }
        fullscreenLoading.style.display = "none";
        fullscreenContent.style.display = "block";
      })
      .catch((error) => {
        console.error("Error fetching rephrased content:", error);
        fullscreenContent.textContent = "Error loading rephrased content.";
        fullscreenLoading.style.display = "none";
        fullscreenContent.style.display = "block";
      });
  }
});

injectFullscreenPopup();
