// Vars and const
let currentImgNum = getRandomImgNum();
const pathToImgs =
  "https://raw.githubusercontent.com/khoncharov/momentum-assets/images/images";

// HTML Elements
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");

// Functions
function getRandomImgNum() {
  return Math.floor(Math.random() * 20) + 1;
}

function getPartOfTheDay() {
  const date = new Date();
  if (date.getHours() >= 6 && date.getHours() <= 11) {
    return "morning";
  } else if (date.getHours() >= 12 && date.getHours() <= 17) {
    return "afternoon";
  } else if (date.getHours() >= 18 && date.getHours() <= 23) {
    return "evening";
  } else if (date.getHours() >= 0 && date.getHours() <= 5) {
    return "night";
  }
}

function showSlide(num) {
  const partOfTheDay = getPartOfTheDay();
  const img = ("0" + num).slice(-2) + ".webp";
  document.body.style.backgroundImage = `url(${pathToImgs}/${partOfTheDay}/${img})`;
}
showSlide(currentImgNum);

// Events
slidePrev.addEventListener("click", () => {
  currentImgNum = currentImgNum - 1 || 20;
  showSlide(currentImgNum);
});

slideNext.addEventListener("click", () => {
  currentImgNum = currentImgNum + 1 === 21 ? 1 : currentImgNum + 1;
  showSlide(currentImgNum);
});
