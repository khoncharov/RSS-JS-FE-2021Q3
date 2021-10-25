let isPlay = false;
let songNum = 0;
const playList = [
  {
    title: "Aqua Caelestis",
    src: "./assets/sounds/Aqua Caelestis.mp3",
  },
  {
    title: "Ennio Morricone",
    src: "./assets/sounds/Ennio Morricone.mp3",
  },
  {
    title: "River Flows In You",
    src: "./assets/sounds/River Flows In You.mp3",
  },
  {
    title: "Summer Wind",
    src: "./assets/sounds/Summer Wind.mp3",
  },
];

// HTML Elements
const audio = document.querySelector(".audio-player");
const playBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-next");
const playPrevBtn = document.querySelector(".play-prev");

// Functions

function playAudio() {
  if (isPlay) {
    audio.pause();
  } else {
    audio.currentTime = 0;
    audio.src = playList[songNum].src;
    audio.play();
  }
  isPlay = !isPlay;
}

function nextTrack() {
  songNum = songNum + 1 === playList.length ? 0 : songNum + 1;
}

function prevTrack() {
  songNum = songNum - 1 < 0 ? playList.length - 1 : songNum - 1;
}

function updatePlayList() {
  let list = "";
  playList.forEach((song) => {
    list += `<li class="song-item">${song.title}</li>`;
  });
  return `<ul class="audio-playlist">${list}</ul>`;
}

function stylePlaying() {
  const songsList = document.querySelectorAll(".song-item");
  if (isPlay) {
    songsList[songNum].classList.remove("playing");
    playBtn.classList.remove("pause");
  } else {
    songsList[songNum].classList.add("playing");
    playBtn.classList.add("pause");
  }
}

function currentSongStyle() {
  const songsList = document.querySelectorAll(".song-item");
  songsList.forEach((item) => {
    item.classList.remove("current-song");
  });
  songsList[songNum].classList.add("current-song");
}

document.querySelector(".audio-playlist-container").innerHTML = updatePlayList();
currentSongStyle();

// Events

playBtn.addEventListener("click", () => {
  stylePlaying();
  playAudio();
});

playNextBtn.addEventListener("click", () => {
  if (isPlay) {
    stylePlaying();
    playAudio();
    nextTrack();
    currentSongStyle();
    stylePlaying();
    playAudio();
  } else {
    nextTrack();
    currentSongStyle();
    stylePlaying();
    playAudio();
  }
});

playPrevBtn.addEventListener("click", () => {
  if (isPlay) {
    stylePlaying();
    playAudio();
    prevTrack();
    currentSongStyle();
    stylePlaying();
    playAudio();
  } else {
    prevTrack();
    currentSongStyle();
    stylePlaying();
    playAudio();
  }
});

audio.addEventListener("ended", () => {
  stylePlaying();
  playAudio();
  nextTrack();
  currentSongStyle();
  stylePlaying();
  playAudio();
});
