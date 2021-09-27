const galleryPicContainer = document.querySelector(".picture-container");
const galleryPic = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const innerPicContainer = (arr) => {
  arr.sort(() => Math.random() - 0.5);
  console.log(arr);
  return `<div class="picture-inner-container margin-top50">
            <img src="./assets/img/gallery/gallery${arr[0]}.jpg" alt=" gallery picture 1" />
            <img src="./assets/img/gallery/gallery${arr[1]}.jpg" alt=" gallery picture 2" />
            <img src="./assets/img/gallery/gallery${arr[2]}.jpg" alt=" gallery picture 3" />
            <img src="./assets/img/gallery/gallery${arr[3]}.jpg" alt=" gallery picture 4" />
            <img src="./assets/img/gallery/gallery${arr[4]}.jpg" alt=" gallery picture 5" />
          </div>
          <div class="picture-inner-container">
            <img src="./assets/img/gallery/gallery${arr[5]}.jpg" alt=" gallery picture 6" />
            <img src="./assets/img/gallery/gallery${arr[6]}.jpg" alt=" gallery picture 7" />
            <img src="./assets/img/gallery/gallery${arr[7]}.jpg" alt=" gallery picture 8" />
            <img src="./assets/img/gallery/gallery${arr[8]}.jpg" alt=" gallery picture 9" />
            <img src="./assets/img/gallery/gallery${arr[9]}.jpg" alt=" gallery picture 10" />
          </div>
          <div class="picture-inner-container margin-top50">
            <img src="./assets/img/gallery/gallery${arr[10]}.jpg" alt=" gallery picture 11" />
            <img src="./assets/img/gallery/gallery${arr[11]}.jpg" alt=" gallery picture 12" />
            <img src="./assets/img/gallery/gallery${arr[12]}.jpg" alt=" gallery picture 13" />
            <img src="./assets/img/gallery/gallery${arr[13]}.jpg" alt=" gallery picture 14" />
            <img src="./assets/img/gallery/gallery${arr[14]}.jpg" alt=" gallery picture 15" />
          </div>`;
};

galleryPicContainer.innerHTML = innerPicContainer(galleryPic);
