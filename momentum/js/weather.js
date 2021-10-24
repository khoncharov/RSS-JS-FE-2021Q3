import { pageData } from "./page-data.js";

const APIID = "d31c9bba17d55cf6a0483dc2f4f74c6b";
const units = "metric";

const weatherAPILink = (place, lang, apiKey, units) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${place}&lang=${lang}&appid=${apiKey}&units=${units}`;
};

// HTML Elements
const inputCity = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");

function clearWeatherWidget(warning = "") {
  weatherIcon.className = "weather-icon owf";
  temperature.textContent = "";
  weatherDescription.textContent = "";
  wind.textContent = "";
  humidity.textContent = "";
  weatherError.textContent = warning;
}

function updateWeatherWidget(weatherData) {
  inputCity.value = pageData.usercity;
  if (weatherData.cod === 200) {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
    temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    weatherDescription.textContent = weatherData.weather[0].description;
    wind.textContent = `Wind: ${Math.round(weatherData.wind.speed)} m/s `;
    humidity.textContent = `Humidity: ${Math.round(weatherData.main.humidity)} %`;
    weatherError.textContent = "";
  } else {
    clearWeatherWidget("Incorrect city spelling");
  }
}

async function getWeather() {
  if (pageData.usercity === "") {
    clearWeatherWidget("Enter you location");
    return;
  }
  const url = weatherAPILink(
    pageData.usercity.toLowerCase(),
    pageData.appSettings.language,
    APIID,
    units
  );
  const res = await fetch(url);
  const data = await res.json();
  updateWeatherWidget(data);
}

// Events
inputCity.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    e.target.blur();
  }
});

inputCity.addEventListener("blur", () => {
  pageData.usercity = inputCity.value.trim();
  getWeather();
});

export default getWeather;
