import { TDecorData } from '../types';

export class DecorationsPage {
  draw(decorItems: TDecorData): void {
    const menuXmasTreeBtn = <HTMLElement>document.querySelector('#game-nav-2');
    menuXmasTreeBtn.classList.remove('game-nav__menu-btn_selected');
    const menuDecorBtn = <HTMLElement>document.querySelector('#game-nav-1');
    menuDecorBtn.classList.add('game-nav__menu-btn_selected');

    const mainContainer = <HTMLElement>document.querySelector('.main');
    mainContainer.innerHTML = '';

    const decorContainer: HTMLDivElement = document.createElement('div');
    decorContainer.classList.add('main-decor-container');

    const filterSection: HTMLElement = document.createElement('section');
    filterSection.classList.add('decor-filter');

    const cardsSection: HTMLElement = document.createElement('section');
    cardsSection.classList.add('decorations-cards');
    // TODO: async list load?
    if (decorItems.length === 0) {
      cardsSection.appendChild(this.getEmptyCard());
    } else {
      cardsSection.appendChild(this.getCardsList(decorItems));
    }

    decorContainer.append(filterSection, cardsSection);
    mainContainer.append(decorContainer);
  }

  getCardsList(data: TDecorData): HTMLElement {
    const listContainer: HTMLUListElement = document.createElement('ul');
    listContainer.classList.add('decorations-cards__container');

    data.forEach((item) => {
      const card: HTMLLIElement = document.createElement('li');
      const caption: HTMLHeadingElement = document.createElement('h3');
      const image: HTMLImageElement = document.createElement('img');
      const count: HTMLParagraphElement = document.createElement('p');
      const year: HTMLParagraphElement = document.createElement('p');
      const shape: HTMLParagraphElement = document.createElement('p');
      const color: HTMLParagraphElement = document.createElement('p');
      const size: HTMLParagraphElement = document.createElement('p');

      card.classList.add('decor-card');
      caption.classList.add('decor-card__caption');
      image.classList.add('decor-card__img');
      count.classList.add('decor-card__prop');
      year.classList.add('decor-card__prop');
      shape.classList.add('decor-card__prop');
      color.classList.add('decor-card__prop');
      size.classList.add('decor-card__prop');

      card.id = item.id.toString();
      caption.textContent = item.name;
      image.src = `./assets/toys/${item.id}.png`;
      image.alt = item.name;
      count.textContent = `Количество: ${item.count}`;
      year.textContent = `Год покупки: ${item.year}`;
      shape.textContent = `Форма: ${item.shape}`;
      color.textContent = `Цвет: ${item.color}`;
      size.textContent = `Размер: ${item.shape}`;

      card.append(caption, image, count, year, shape, color, size);
      listContainer.appendChild(card);
    });
    return listContainer;
  }

  getEmptyCard(): HTMLElement {
    const listContainer: HTMLUListElement = document.createElement('ul');
    listContainer.classList.add('decorations-cards__container');

    const card: HTMLLIElement = document.createElement('li');
    card.classList.add('decor-card__not-found');
    card.textContent = 'Извините, совпадений не обнаружено ¯\\_(ツ)_/¯';

    listContainer.appendChild(card);
    return listContainer;
  }
}
