import { pageData } from "./page-data.js";

// HTML Elements
const quoteRefreshBtn = document.querySelector(".change-quote");
const quoteText = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".author");

// Functions
function updateQuoteWidget(data) {
  const randomQuoteNum = Math.floor(Math.random() * 5);
  quoteText.textContent = data.quotes[pageData.appSettings.language][randomQuoteNum].text;
  quoteAuthor.textContent =
    data.quotes[pageData.appSettings.language][randomQuoteNum].author;
}

async function getQuote() {
  const req = await fetch("./assets/quotes.json");
  const data = await req.json();
  updateQuoteWidget(data);
}

getQuote();

// Events
quoteRefreshBtn.addEventListener("click", () => {
  quoteText.style.opacity = 0;
  quoteAuthor.style.opacity = 0;
  setTimeout(() => {
    getQuote();
    quoteText.style.opacity = 1;
    quoteAuthor.style.opacity = 1;
  }, 900);
});

export default getQuote;
