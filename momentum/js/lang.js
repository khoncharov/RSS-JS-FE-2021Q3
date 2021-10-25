import { pageData } from "./page-data.js";

function changeCaptionsLang() {
  switch (pageData.appSettings.language) {
    case "en":
      document.querySelector(".name").placeholder = "[ Your name ]";
      document.querySelector(".options-btn").textContent = "options";
      document.querySelector(".city").placeholder = "[ City ]";
      break;
    case "ru":
      document.querySelector(".name").placeholder = "[ Ваше имя ]";
      document.querySelector(".options-btn").textContent = "настройки";
      document.querySelector(".city").placeholder = "[ Город ]";
      break;
  }
}

changeCaptionsLang();

function changeOptionsLang() {
  switch (pageData.appSettings.language) {
    case "en":
      document.querySelector(".options-header").innerText = "Options";
      document.querySelector("#opt-lang").innerText = "Language";
      document.querySelector(".options__inner-header").innerText = "Show";
      document.querySelector("#opt-time").innerText = "Time";
      document.querySelector("#opt-date").innerText = "Date";
      document.querySelector("#opt-greeting").innerText = "Greeting";
      document.querySelector("#opt-quote").innerText = "Quote";
      document.querySelector("#opt-weather").innerText = "Weather";
      document.querySelector("#opt-audio").innerText = "Audio";
      break;
    case "ru":
      document.querySelector(".options-header").innerText = "Настройки";
      document.querySelector("#opt-lang").innerText = "Язык";
      document.querySelector(".options__inner-header").innerText = "Показать";
      document.querySelector("#opt-time").innerText = "Время";
      document.querySelector("#opt-date").innerText = "Дата";
      document.querySelector("#opt-greeting").innerText = "Приветствие";
      document.querySelector("#opt-quote").innerText = "Цитата";
      document.querySelector("#opt-weather").innerText = "Погода";
      document.querySelector("#opt-audio").innerText = "Плеер";
      break;
  }
}

changeOptionsLang();

export { changeCaptionsLang, changeOptionsLang };
