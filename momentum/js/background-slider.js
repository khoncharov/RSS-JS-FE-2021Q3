// Vars and consts
let currentImgNum = getRandomImgNum();
let currnetPartOfTheDay = getPartOfTheDay(new Date());
const pathToImgs =
  "https://raw.githubusercontent.com/khoncharov/momentum-assets/images/images";

// Functions
function getRandomImgNum() {
  return Math.floor(Math.random() * 20) + 1;
}

function getPartOfTheDay(date) {
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

function showSlide() {
  const imgName = ("0" + currentImgNum).slice(-2) + ".webp";
  const img = new Image();
  img.src = `${pathToImgs}/${currnetPartOfTheDay}/${imgName}`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
}

showSlide();

function prevSlide() {
  currentImgNum = currentImgNum - 1 || 20;
  showSlide();
}

function nextSlide() {
  currentImgNum = currentImgNum + 1 === 21 ? 1 : currentImgNum + 1;
  showSlide();
}

function updateBackGround(newDate) {
  if (getPartOfTheDay(newDate) !== currnetPartOfTheDay) {
    currentImgNum = getRandomImgNum();
    currnetPartOfTheDay = getPartOfTheDay(newDate);
    showSlide();
  }
}

export { prevSlide, nextSlide, updateBackGround };
