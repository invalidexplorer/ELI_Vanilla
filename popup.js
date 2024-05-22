let url = null;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  url = tabs[0].url; // URL of the current tab
});

document.addEventListener("DOMContentLoaded", function () {
  let s = document.createElement("style");
  document.head.appendChild(s);

  const levels = [
    {
      emoji: "👶",
      label: "Basic",
      subfont: "Building knowledge. Introduction to foundational ideas.",
    },
    {
      emoji: "👦",
      label: "Novice",
      subfont: "Grasping early concepts. Learning the basics step by step.",
    },
    {
      emoji: "🧑‍🎓",
      label: "Intermediate",
      subfont: "Deepening understanding. Exploring more detailed ideas.",
    },
    {
      emoji: "👨‍🏫",
      label: "Advanced",
      subfont: "Mastering complexities. Engaging with advanced concepts.",
    },
    {
      emoji: "🧠",
      label: "Expert",
      subfont: "Achieving expertise. Delving into the depths of the field.",
    },
  ];

  const slider = document.getElementById("slider");
  const sliderLabel = document.querySelector(".slider-label");
  const subfontDescription = document.querySelector(".subfont-description");
  const previewPanel = document.getElementById("preview-panel");
  const previewContent = document.getElementById("preview-content");
  const loadingScreen = document.getElementById("loading-screen");
  const saveOption = document.getElementById("save-option");

  // Load saved settings
  const savedSliderValue = localStorage.getItem("sliderValue");
  if (savedSliderValue) {
    slider.value = savedSliderValue;
    updateSliderUI(levels[savedSliderValue - 1]);
    let percentage = ((savedSliderValue - 1) / 4) * 100;
    s.textContent = `.slider {
      background: linear-gradient(to right, #117A6F ${percentage}%, #D9D9D9 ${percentage}%);
    }`;
  } else {
    // Set initial values
    updateSliderUI(levels[0]);
  }

  slider.addEventListener("input", () => {
    const value = slider.value - 1;
    updateSliderUI(levels[value]);
    let percentage = (value / 4) * 100;
    s.textContent = `.slider {
      background: linear-gradient(to right, #117A6F ${percentage}%, #D9D9D9 ${percentage}%);
    }`;
  });

  const toggleButtons = document.querySelectorAll(".toggle");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      toggleButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const description = document.querySelector(".description");
      if (this.textContent === "ADHD") {
        description.textContent =
          "ELI restructures and rephrases the content in a way that is accessible to you.";
      } else {
        description.textContent =
          "ELI helps you understand complex content easily with a customizable comprehension selector.";
      }
    });
  });

  const previewButton = document.querySelector(".button.rounded-button");
  const rephraseButton = document.querySelector(
    ".button.rounded-button.green-button"
  );
  const refreshButton = document.querySelector(".icon-button.refresh");

  previewButton.addEventListener("click", function () {
    handlePreview();
  });

  rephraseButton.addEventListener("click", function () {
    handleRephrase();
  });

  refreshButton.addEventListener("click", function () {
    handleRefresh();
  });

  const closeButton = document.querySelector(".icon-button.close");
  closeButton.addEventListener("click", function () {
    closeIframe();
  });

  saveOption.addEventListener("change", function () {
    if (saveOption.checked) {
      localStorage.setItem("sliderValue", slider.value);
    } else {
      localStorage.removeItem("sliderValue");
    }
  });

  function updateSliderUI(level) {
    sliderLabel.textContent = level.label;
    subfontDescription.textContent = level.subfont;
  }

  function handlePreview() {
    console.log("Preview clicked");
    const sliderValue = document.getElementById("slider").value;

    // Show loading screen
    loadingScreen.style.display = "block";
    previewPanel.style.display = "none";

    // Perform POST request to get preview text for the current level
    fetch("https://run.mocky.io/v3/4a45c502-95e3-4e8d-9adc-fc6b545a35bc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ level: sliderValue, url: url }),
    })
      .then((response) => response.json())
      .then((data) => {
        previewContent.textContent = data[sliderValue].previewText;
        previewPanel.style.display = "block";
        loadingScreen.style.display = "none";
      })
      .catch(() => {
        previewContent.textContent = "Error loading preview.";
        previewPanel.style.display = "block";
        loadingScreen.style.display = "none";
      });
  }

  function handleRephrase() {
    console.log("Rephrase clicked");
    const sliderValue = document.getElementById("slider").value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const message = { sliderValue, url: url };

      // Send message to the content script
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }

  function handleRefresh() {
    // Reset slider
    slider.value = 1;
    updateSliderUI(levels[0]);
    let percentage = 0;
    s.textContent = `.slider {
      background: linear-gradient(to right, #117A6F ${percentage}%, #D9D9D9 ${percentage}%);
    }`;

    // Reset toggle buttons
    toggleButtons.forEach((btn) => btn.classList.remove("active"));
    toggleButtons[0].classList.add("active");

    // Reset description
    const description = document.querySelector(".description");
    description.textContent =
      "ELI helps you understand complex content easily with a customizable comprehension selector.";

    // Hide preview panel
    previewPanel.style.display = "none";

    // Uncheck and remove saved slider value
    saveOption.checked = false;
    localStorage.removeItem("sliderValue");
  }

  function closeIframe() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const message = { action: "toggleIframe" };

      // Send message to the content script
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
});
