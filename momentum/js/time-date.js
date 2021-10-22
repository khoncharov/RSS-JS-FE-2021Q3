import { pageData } from "./page-data.js";

// HTML Elements
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

const dateOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

// Functions
(function showTimeDate() {
  const date = new Date();
  // Time
  timeElement.textContent = date.toLocaleTimeString([], { hour12: false });
  // Date
  if (pageData.appSettings.language === "en") {
    dateElement.textContent = date.toLocaleDateString("en-US", dateOptions);
  } else if (pageData.appSettings.language === "ru") {
    const dateStr = date.toLocaleDateString("ru-RU", dateOptions);
    dateElement.textContent = dateStr.slice(0, 1).toUpperCase() + dateStr.slice(1);
  }
  setTimeout(showTimeDate, 1000);
})();
