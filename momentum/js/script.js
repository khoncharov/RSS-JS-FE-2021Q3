import "./self-check.js";
import "./options.js";
import showTimeDate from "./time-date.js";
import showGreeting from "./greeting.js";
import { prevSlide, nextSlide, updateBackGround } from "./background-slider.js";

// Functions
function updatePage() {
  const date = new Date();
  showTimeDate(date);
  showGreeting(date);
  updateBackGround(date);
  setTimeout(updatePage, 1000);
}

updatePage();

// Events
document.querySelector(".slide-prev").addEventListener("click", prevSlide);
document.querySelector(".slide-next").addEventListener("click", nextSlide);
