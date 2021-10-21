// Data structures
const state = {
  language: "en",
  photoSource: "github",
  blocks: ["time", "date", "greeting", "quote", "weather", "audio", "todolist"],
};

// HTML Elements
const optionsBtn = document.querySelector(".optrions-btn");
const overlay = document.querySelector(".options-overlay");
const optionsContainer = document.querySelector(".options-container");

// Functions
function closeOptionsHandler() {
  overlay.classList.remove("options-overlay_active");
  optionsContainer.classList.remove("options-container_active");
}

function openOptionsHandler() {
  overlay.classList.add("options-overlay_active");
  optionsContainer.classList.add("options-container_active");
}

// Events
optionsBtn.addEventListener("click", openOptionsHandler);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeOptionsHandler();
  }
});
