import "./self-check.js";
import "./options.js";
import showTimeDate from "./time-date.js";
import showGreeting from "./greeting.js";
import { prevSlide, nextSlide, updateBackGround } from "./background-slider.js";
import getWeather from "./weather.js";
import { pageData } from "./page-data.js";
import "./quotes.js";
import "./lang.js";
import "./audio-player.js";

// Functions
function updatePage() {
  const date = new Date();
  showTimeDate(date);
  showGreeting(date);
  updateBackGround(date);
  setTimeout(updatePage, 1000);
}

updatePage();

function updateWeather() {
  if (pageData.appSettings.blocks.includes("weather")) {
    getWeather();
    setTimeout(updateWeather, 3600000); // update period 1 hour
  }
}

updateWeather();

// Events
document.querySelector(".slide-prev").addEventListener("click", prevSlide);
document.querySelector(".slide-next").addEventListener("click", nextSlide);
