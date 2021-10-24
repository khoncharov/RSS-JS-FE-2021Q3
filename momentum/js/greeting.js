import { pageData } from "./page-data.js";

export default function showGreeting(date) {
  if (date.getHours() >= 6 && date.getHours() <= 11) {
    if (pageData.appSettings.language === "en") {
      document.querySelector(".greeting").textContent = "Good morning,";
    } else if (pageData.appSettings.language === "ru") {
      document.querySelector(".greeting").textContent = "Доброе утро,";
    }
  } else if (date.getHours() >= 12 && date.getHours() <= 17) {
    if (pageData.appSettings.language === "en") {
      document.querySelector(".greeting").textContent = "Good afternoon,";
    } else if (pageData.appSettings.language === "ru") {
      document.querySelector(".greeting").textContent = "Добрый день,";
    }
  } else if (date.getHours() >= 18 && date.getHours() <= 23) {
    if (pageData.appSettings.language === "en") {
      document.querySelector(".greeting").textContent = "Good evening,";
    } else if (pageData.appSettings.language === "ru") {
      document.querySelector(".greeting").textContent = "Добрый вечер,";
    }
  } else if (date.getHours() >= 0 && date.getHours() <= 5) {
    if (pageData.appSettings.language === "en") {
      document.querySelector(".greeting").textContent = "Good night,";
    } else if (pageData.appSettings.language === "ru") {
      document.querySelector(".greeting").textContent = "Доброй ночи,";
    }
  }
}

const nameInput = document.querySelector(".name");

function showUsername() {
  nameInput.value = pageData.username ?? null;
}
showUsername();

nameInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    e.target.blur();
  }
});

nameInput.addEventListener("blur", () => {
  pageData.username = nameInput.value;
});
