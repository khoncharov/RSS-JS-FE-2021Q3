import { Color, Shape, Size, SortType, TDecorData, TFavoriteDecor } from '../types/types';
import {
  YEAR_FILTER_MIN,
  YEAR_FILTER_MAX,
  COUNT_FILTER_MIN,
  COUNT_FILTER_MAX,
  COUNT_FILTER_STEP,
  YEAR_FILTER_STEP,
} from '../const';
import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wNumb from 'wnumb';

export class DecorationsPage {
  drawPage(): void {
    const menuXmasTreeBtn = <HTMLElement>document.querySelector('#game-nav-2');
    menuXmasTreeBtn.classList.remove('game-nav__menu-btn_selected');
    const menuDecorBtn = <HTMLElement>document.querySelector('#game-nav-1');
    menuDecorBtn.classList.add('game-nav__menu-btn_selected');

    const gameNavigation = <HTMLElement>document.querySelector('.game-nav__container');
    gameNavigation.classList.remove('hidden');
    const favCounter = <HTMLElement>document.querySelector('.fav-counter');
    favCounter.classList.remove('hidden');

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
    listContainer.innerHTML = '';

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
      size.textContent = `Размер: ${item.size}`;

      card.append(caption, image, count, year, shape, color, size);
      listContainer.appendChild(card);
    });
  }

  drawEmptyCard(): void {
    const listContainer = <HTMLUListElement>document.querySelector('.decorations-cards__container');
    listContainer.innerHTML = '';

    const card: HTMLLIElement = document.createElement('li');
    card.classList.add('decor-card__not-found');
    card.textContent = 'Извините, совпадений не обнаружено ¯\\_(ツ)_/¯';

    listContainer.appendChild(card);
  }

  drawFilters(): void {
    const filterSection = <HTMLElement>document.querySelector('.decor-filter');
    filterSection.innerHTML = `    
      <div class="decor-filter__search-container ico-enter">
        <h2 class="decor-filter__caption">Поиск</h2>
        <input class="decor-filter__search-input" type="text" autocomplete="off" placeholder="Название игрушки"/>
      </div>
      <div class="decor-filter__sort-container">
        <h2 class="decor-filter__caption">Сортировка</h2>
        <select
          class="decor-filter__select-option"
          name="decor-sort-type"
          id="decor-sort-type"
        >
          <option value="0">Без сортировки</option>
          <option value="1">По названию от А до Я</option>
          <option value="2">По названию от Я до А</option>
          <option value="3">По год покупки, по возрастанию</option>
          <option value="4">По год покупки, по убыванию</option>
        </select>
      </div>
      <div class="decor-filter__cat-title-container">
        <h2 class="decor-filter__caption">Фильтры</h2>
      </div>
      <div class="decor-filter__container-1" id="shape-filter-id">
        <h3 class="decor-filter__sub-cat-name">Форма</h3>
        <div class="filter-item ico-decor-ball" id="decor-shape-${Shape.Ball}" title="Шар"></div>
        <div class="filter-item ico-decor-bell" id="decor-shape-${Shape.Bell}" title="Колокольчик"></div>
        <div class="filter-item ico-decor-cone" id="decor-shape-${Shape.Cone}" title="Шишка"></div>
        <div class="filter-item ico-decor-flake" id="decor-shape-${Shape.Flake}" title="Снежинка"></div>
        <div class="filter-item ico-decor-figure" id="decor-shape-${Shape.Figure}" title="Фигурка"></div>
      </div>
      <div class="decor-filter__container-1" id="color-filter-id">
        <h3 class="decor-filter__sub-cat-name">Цвет</h3>
        <div class="filter-item circle-white" id="decor-color-${Color}" title="Белый"></div>
        <div class="filter-item circle-yellow" id="decor-color-${Color.Yellow}" title="Желтый"></div>
        <div class="filter-item circle-red" id="decor-color-${Color.Red}" title="Красный"></div>
        <div class="filter-item circle-blue" id="decor-color-${Color.Blue}" title="Синий"></div>
        <div class="filter-item circle-green" id="decor-color-${Color.Green}" title="Зеленый"></div>
      </div>
      <div class="decor-filter__container-1" id="size-filter-id">
        <h3 class="decor-filter__sub-cat-name">Размер</h3>
        <div class="filter-item" id="decor-size-${Size.Large}" title="Большой">L</div>
        <div class="filter-item" id="decor-size-${Size.Medium}" title="Средний">M</div>
        <div class="filter-item" id="decor-size-${Size.Small}" title="Малый">S</div>
      </div>
      <div class="decor-filter__container-2">
        <h3 class="decor-filter__sub-cat-name">Только любимые</h3>
        <div class="filter-item ico-box" id="decor-only-favorite"></div>
      </div>
      <div class="decor-filter__container-3">
        <h3 class="decor-filter__sub-cat-name">Количество</h3>
        <div class="filter-value-min" id="range-count-min"></div>
        <div id="range-count"></div>
        <div class="filter-value-max" id="range-count-max"></div>
      </div>
      <div class="decor-filter__container-3">
        <h3 class="decor-filter__sub-cat-name">Год покупки</h3>
        <div class="filter-value-min" id="range-year-min"></div>
        <div id="range-year"></div>
        <div class="filter-value-max" id="range-year-max"></div>
      </div>
      <div class="decor-filter__reset-btn-container">
        <button class="decor-filter__reset-btn" id="reset-decor-filters-btn" type="button">Сброс фильтров</button>
        <button class="decor-filter__reset-btn" id="reset-settings-btn" type="button">Сброс настроек</button>
      </div>`;
  }

  setDefaultFocus(): void {
    const searchInput = <HTMLInputElement>document.querySelector('.decor-filter__search-input');
    searchInput.focus();
  }

  setSearchQuery(query: string): void {
    const searchInput = <HTMLInputElement>document.querySelector('.decor-filter__search-input');
    searchInput.value = query;
  }

  setSortType(index: SortType): void {
    const sortType = <HTMLSelectElement>document.querySelector('#decor-sort-type');
    sortType.selectedIndex = index;
  }

  setShapeFilter(shapeFilter: Set<Shape>): void {
    const shapeItems = document.querySelectorAll('div[id^=decor-shape-]');
    shapeItems.forEach((element) => {
      element.classList.remove('filter-item-chosen');
    });
    shapeFilter.forEach((shape) => {
      const item = <HTMLDivElement>document.querySelector(`#decor-shape-${shape}`);
      item.classList.add('filter-item-chosen');
    });
  }

  setColorFilter(colorFilter: Set<Color>): void {
    const colorItems = document.querySelectorAll('div[id^=decor-color-]');
    colorItems.forEach((element) => {
      element.classList.remove('filter-item-chosen');
    });
    colorFilter.forEach((color) => {
      const item = <HTMLDivElement>document.querySelector(`#decor-color-${color}`);
      item.classList.add('filter-item-chosen');
    });
  }

  setSizeFilter(sizeFilter: Set<Size>): void {
    const sizeItems = document.querySelectorAll('div[id^=decor-size-]');
    sizeItems.forEach((element) => {
      element.classList.remove('filter-item-chosen');
    });
    sizeFilter.forEach((size) => {
      const item = <HTMLDivElement>document.querySelector(`#decor-size-${size}`);
      item.classList.add('filter-item-chosen');
    });
  }

  setFavoriteOnlyFilter(isFavoriteOnly: boolean): void {
    const favoriteOnlyItem = <HTMLDivElement>document.querySelector('#decor-only-favorite');
    if (isFavoriteOnly) {
      favoriteOnlyItem.classList.add('ico-check');
    } else {
      favoriteOnlyItem.classList.remove('ico-check');
    }
  }

  createCountSlider(countFilter: [number, number]): void {
    const range = document.getElementById('range-count') as target;

    noUiSlider.create(range, {
      range: {
        min: COUNT_FILTER_MIN,
        max: COUNT_FILTER_MAX,
      },

      step: COUNT_FILTER_STEP,
      start: countFilter,
      connect: true,
      direction: 'ltr',
      orientation: 'horizontal',

      behaviour: 'tap-drag',
      format: wNumb({
        decimals: 0,
      }),
    });

    range.noUiSlider?.on('update', function (values) {
      const min = <HTMLDivElement>document.getElementById('range-count-min');
      const max = <HTMLDivElement>document.getElementById('range-count-max');
      min.textContent = values[0].toString();
      max.textContent = values[1].toString();
    });
  }

  createYearSlider(yearFilter: [number, number]): void {
    const range = document.getElementById('range-year') as target;

    noUiSlider.create(range, {
      range: {
        min: YEAR_FILTER_MIN,
        max: YEAR_FILTER_MAX,
      },

      step: YEAR_FILTER_STEP,
      start: yearFilter,
      connect: true,
      direction: 'ltr',
      orientation: 'horizontal',

      behaviour: 'tap-drag',
      format: wNumb({
        decimals: 0,
      }),
    });

    range.noUiSlider?.on('update', function (values) {
      const min = <HTMLDivElement>document.getElementById('range-year-min');
      const max = <HTMLDivElement>document.getElementById('range-year-max');
      min.textContent = values[0].toString();
      max.textContent = values[1].toString();
    });
  }
}
