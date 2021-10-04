import innerGalleryContainer from "./js/gallery.js";
import openBuyForm from "./js/ticket-form.js";

// Gallary shuffle
document.querySelector(".picture-container").innerHTML = innerGalleryContainer();

// Ticket form opener
document.querySelector(".tickets-selector__btn").addEventListener("click", openBuyForm);

console.log(`
Выполнено:
Ширина экрана 1024px
Блок header - 4
Секция Welcome - 4
Секция Visiting - 4
Результат проверки скорости сайта для мобильных устройств - 4
Итого: 16 баллов
`);
