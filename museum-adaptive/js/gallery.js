const innerGalleryContainer = () => {
  const galleryPic = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  galleryPic.sort(() => Math.random() - 0.5);
  return `<div class="picture-inner-container margin-top50">
            <img src="./assets/img/gallery/gallery${galleryPic[0]}.jpg" alt=" gallery picture 1" />
            <img src="./assets/img/gallery/gallery${galleryPic[1]}.jpg" alt=" gallery picture 2" />
            <img src="./assets/img/gallery/gallery${galleryPic[2]}.jpg" alt=" gallery picture 3" />
            <img src="./assets/img/gallery/gallery${galleryPic[3]}.jpg" alt=" gallery picture 4" />
            <img src="./assets/img/gallery/gallery${galleryPic[4]}.jpg" alt=" gallery picture 5" />
          </div>
          <div class="picture-inner-container">
            <img src="./assets/img/gallery/gallery${galleryPic[5]}.jpg" alt=" gallery picture 6" />
            <img src="./assets/img/gallery/gallery${galleryPic[6]}.jpg" alt=" gallery picture 7" />
            <img src="./assets/img/gallery/gallery${galleryPic[7]}.jpg" alt=" gallery picture 8" />
            <img src="./assets/img/gallery/gallery${galleryPic[8]}.jpg" alt=" gallery picture 9" />
            <img src="./assets/img/gallery/gallery${galleryPic[9]}.jpg" alt=" gallery picture 10" />
          </div>
          <div class="picture-inner-container margin-top50">
            <img src="./assets/img/gallery/gallery${galleryPic[10]}.jpg" alt=" gallery picture 11" />
            <img src="./assets/img/gallery/gallery${galleryPic[11]}.jpg" alt=" gallery picture 12" />
            <img src="./assets/img/gallery/gallery${galleryPic[12]}.jpg" alt=" gallery picture 13" />
            <img src="./assets/img/gallery/gallery${galleryPic[13]}.jpg" alt=" gallery picture 14" />
            <img src="./assets/img/gallery/gallery${galleryPic[14]}.jpg" alt=" gallery picture 15" />
          </div>`;
};

export default innerGalleryContainer;
