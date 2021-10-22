import { pageData } from "./page-data.js";

// HTML Elements
const optionsBtn = document.querySelector(".optrions-btn");
const optionsCloseBtn = document.querySelector(".options-close-btn");
const overlay = document.querySelector(".options-overlay");
const optionsContainer = document.querySelector(".options-container");

// Functions
function closeOptionsHandler() {
  const newAppSettings = {
    blocks: [],
  };
  const toggleCollection = document.querySelectorAll(".toggle-container");
  toggleCollection.forEach((toggle) => {
    if (toggle.toggle_state) {
      newAppSettings.blocks.push(toggle.id.split("-")[1]);
    }
  });
  pageData.appSettings = { ...pageData.appSettings, ...newAppSettings };
  overlay.classList.remove("options-overlay_active");
  optionsContainer.classList.remove("options-container_active");
  optionsContainer.tabindex = -1;
}

function openOptionsHandler() {
  const blocksShowen = pageData.appSettings.blocks;
  const toggleCollection = document.querySelectorAll(".toggle-container");
  toggleCollection.forEach((toggle) => {
    if (blocksShowen.includes(toggle.id.split("-")[1])) {
      toggle.toggle_state = 1;
    } else {
      toggle.toggle_state = 0;
    }
    changeToggleStateStyle(toggle);
  });
  overlay.classList.add("options-overlay_active");
  optionsContainer.classList.add("options-container_active");
  optionsContainer.tabindex = 0;
}

function toggleHandler(e) {
  // Styling
  e.currentTarget.classList.toggle("label-active");
  e.currentTarget.firstElementChild.classList.toggle("toggle-box-active");
  e.currentTarget.children[0].firstElementChild.classList.toggle("toggle-switch-active");
  // State: value
  e.currentTarget.toggle_state
    ? (e.currentTarget.toggle_state = 0)
    : (e.currentTarget.toggle_state = 1);
}

function changeToggleStateStyle(toggleElement) {
  if (toggleElement.toggle_state) {
    toggleElement.classList.add("label-active");
    toggleElement.firstElementChild.classList.add("toggle-box-active");
    toggleElement.children[0].firstElementChild.classList.add("toggle-switch-active");
  } else {
    toggleElement.classList.remove("label-active");
    toggleElement.firstElementChild.classList.remove("toggle-box-active");
    toggleElement.children[0].firstElementChild.classList.remove("toggle-switch-active");
  }
}

// Events
optionsBtn.addEventListener("click", openOptionsHandler);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeOptionsHandler();
  }
});

optionsCloseBtn.addEventListener("click", closeOptionsHandler);

document.querySelector("#opt-time-toggle").addEventListener("click", (e) => {
  toggleHandler(e);
});
document.querySelector("#opt-date-toggle").addEventListener("click", (e) => {
  toggleHandler(e);
});
document.querySelector("#opt-greeting-toggle").addEventListener("click", (e) => {
  toggleHandler(e);
});
document.querySelector("#opt-quote-toggle").addEventListener("click", (e) => {
  toggleHandler(e);
});
document.querySelector("#opt-weather-toggle").addEventListener("click", (e) => {
  toggleHandler(e);
});
document.querySelector("#opt-audio-toggle").addEventListener("click", (e) => {
  toggleHandler(e);
});

document.querySelectorAll(".toggle-container").forEach((toggle) => {
  toggle.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      toggleHandler(e);
    }
  });
});
