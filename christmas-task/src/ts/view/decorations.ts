import { TDecorData, TFavoriteDecor } from '../types';

export class DecorationsPage {
  drawPage(): void {
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

    const listContainer: HTMLUListElement = document.createElement('ul');
    listContainer.classList.add('decorations-cards__container');

    cardsSection.append(listContainer);
    decorContainer.append(filterSection, cardsSection);
    mainContainer.append(decorContainer);
  }

  drawCardsList(decorData: TDecorData, favotiveDecor: TFavoriteDecor): void {
    const listContainer = <HTMLUListElement>document.querySelector('.decorations-cards__container');

    decorData.forEach((item) => {
      const card: HTMLLIElement = document.createElement('li');
      const caption: HTMLHeadingElement = document.createElement('h3');
      const image: HTMLImageElement = document.createElement('img');
      const count: HTMLParagraphElement = document.createElement('p');
      const year: HTMLParagraphElement = document.createElement('p');
      const shape: HTMLParagraphElement = document.createElement('p');
      const color: HTMLParagraphElement = document.createElement('p');
      const size: HTMLParagraphElement = document.createElement('p');

      card.classList.add('decor-card');
      if (favotiveDecor.has(item.id)) {
        card.classList.add('ico-favorite-decor');
      }
      caption.classList.add('decor-card__caption');
      image.classList.add('decor-card__img');
      count.classList.add('decor-card__prop');
      year.classList.add('decor-card__prop');
      shape.classList.add('decor-card__prop');
      color.classList.add('decor-card__prop');
      size.classList.add('decor-card__prop');

      card.id = `decor-card-id-${item.id}`;
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
  }

  drawEmptyCard(): void {
    const listContainer = <HTMLUListElement>document.querySelector('.decorations-cards__container');

    const card: HTMLLIElement = document.createElement('li');
    card.classList.add('decor-card__not-found');
    card.textContent = 'Извините, совпадений не обнаружено ¯\\_(ツ)_/¯';

    listContainer.appendChild(card);
  }

  drawFilters(): void {
    const filterSection = <HTMLElement>document.querySelector('.decor-filter');
    filterSection.innerHTML = `    
      <div class="decor-filter__search-container">
        <h2 class="decor-filter__caption">Поиск</h2>
        <input class="decor-filter__search-input" type="text" autocomplete="off" placeholder="Название игрушки"/>
      </div>
      <div class="decor-filter__sort-container">
        <h2 class="decor-filter__caption">Сортировать</h2>
        <select
          class="decor-filter__select-option"
          name="decor-sort-type"
          id="decor-sort-type"
        >
          <option value="0">По названию от А до Я</option>
          <option value="1">По названию от Я до А</option>
          <option value="2">По год покупки, по возрастанию</option>
          <option value="3">По год покупки, по убыванию</option>
        </select>
      </div>
      <div class="decor-filter__cat-title-container">
        <h2 class="decor-filter__caption">Фильтры</h2>
      </div>
      <div class="decor-filter__container-1" id="shape-filter-id">
        <h3 class="decor-filter__sub-cat-name">Форма</h3>
        <div class="filter-item ico-decor-ball" title="Шар"></div>
        <div class="filter-item ico-decor-bell" title="Колокольчик"></div>
        <div class="filter-item ico-decor-cone" title="Шишка"></div>
        <div class="filter-item ico-decor-flake" title="Снежинка"></div>
        <div class="filter-item ico-decor-figure" title="Фигурка"></div>
      </div>
      <div class="decor-filter__container-1" id="color-filter-id">
        <h3 class="decor-filter__sub-cat-name">Цвет</h3>
        <div class="filter-item circle-white" title="Белый"></div>
        <div class="filter-item circle-yellow" title="Желтый"></div>
        <div class="filter-item circle-red" title="Красный"></div>
        <div class="filter-item circle-blue" title="Синий"></div>
        <div class="filter-item circle-green" title="Зеленый"></div>
      </div>
      <div class="decor-filter__container-1" id="size-filter-id">
        <h3 class="decor-filter__sub-cat-name">Размер</h3>
        <div class="filter-item" title="Большой">L</div>
        <div class="filter-item" title="Средний">M</div>
        <div class="filter-item" title="Малый">S</div>
      </div>
      <div class="decor-filter__container-2">
        <h3 class="decor-filter__sub-cat-name">Только любимые</h3>
        <div class="filter-item">
          <input type="checkbox" name="" id="" />
        </div>
      </div>
      <div class="decor-filter__container-3">
        <h3 class="decor-filter__sub-cat-name">Количество</h3>
        <input class="filter-value-min" type="text" name="" id="" value="0" />
        <input class="filter-range" type="range" name="" id="" />
        <input class="filter-value-max" type="text" name="" id="" value="20" />
      </div>
      <div class="decor-filter__container-3">
        <h3 class="decor-filter__sub-cat-name">Год покупки</h3>
        <input class="filter-value-min" type="text" name="" id="" value="1960" />
        <input class="filter-range" type="range" name="" id="" />
        <input class="filter-value-max" type="text" name="" id="" value="2021" />
      </div>
      <div class="decor-filter__reset-btn-container">
        <button class="decor-filter__reset-btn" id="reset-decor-filters-btn" type="button">Сброс фильтров</button>
        <button class="decor-filter__reset-btn" id="reset-localstorage-btn" type="button">Сброс настроек</button>
      </div>`;
  }

  setDefaultFocus(): void {
    const searchInput = <HTMLInputElement>document.querySelector('.decor-filter__search-input');
    searchInput.focus();
  }
}
