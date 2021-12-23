import { target } from 'nouislider';
import * as rawDecorData from '../../data/data.json';
import { getDecorId, getFilterType } from '../funclib/funclib';
import { DecorData } from '../model/decor-data';
import { Color, Shape, Size } from '../types';
import { AppView } from '../view/app-view';
import { AppController } from './controller';

export class Application extends AppController {
  private view = new AppView();
  private decorData = new DecorData(rawDecorData);

  init(): void {
    this.getHomePage();
  }

  getHomePage(): void {
    this.view.drawSartPage();

    const startBtn = <HTMLElement>document.querySelector('.start-btn');
    startBtn.addEventListener('click', () => {
      this.getDecorationsPage();
    });

    const gameNavigation = document.querySelectorAll('.game-nav__menu-btn');
    const homePageBtn = <HTMLButtonElement>gameNavigation[0];
    homePageBtn.addEventListener('click', () => {
      this.getHomePage();
    });

    const decorPageBtn = <HTMLButtonElement>gameNavigation[1];
    decorPageBtn.addEventListener('click', () => {
      this.getDecorationsPage();
    });

    const treePageBtn = <HTMLButtonElement>gameNavigation[2];
    treePageBtn.addEventListener('click', () => {
      this.getXmasTreePage();
    });
  }

  getDecorationsPage(): void {
    this.view.drawDecorationsPage();
    this.view.addFilters(this.settings);
    this.view.updateCardList(
      this.filterDecorData(this.decorData.items, this.settings),
      this.settings.favoriteDecor
    );
    this.view.updateFavoriteCount(this.settings.favoriteDecor.size);

    const listContainer = <HTMLUListElement>document.querySelector('.decorations-cards__container');
    listContainer.addEventListener('click', (e) => {
      const element: HTMLElement = e.target as HTMLElement;
      let card: HTMLLIElement;
      if (element.nodeName === 'LI' && !element.classList.contains('decor-card__not-found')) {
        card = element as HTMLLIElement;
        this.updateFavoriteDecor(getDecorId(card.id));
        this.view.updateFavoriteCount(this.settings.favoriteDecor.size);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      } else if (
        (element.parentNode as HTMLElement).nodeName === 'LI' &&
        !(element.parentNode as HTMLElement).classList.contains('decor-card__not-found')
      ) {
        card = element.parentNode as HTMLLIElement;
        this.updateFavoriteDecor(getDecorId(card.id));
        this.view.updateFavoriteCount(this.settings.favoriteDecor.size);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      }
    });

    const searchInput = <HTMLInputElement>document.querySelector('.decor-filter__search-input');
    searchInput.addEventListener('change', () => {
      this.settings.searchQuery = searchInput.value;
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const sortTypeSelect = <HTMLSelectElement>(
      document.querySelector('.decor-filter__select-option')
    );
    sortTypeSelect.addEventListener('change', () => {
      this.settings.sortType = sortTypeSelect.selectedIndex;
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const shapeFilter = <HTMLDivElement>document.querySelector('#shape-filter-id');
    shapeFilter.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains('filter-item')) {
        const shape = getFilterType(element.id) as Shape;
        this.settings.updateShapeFilter(shape);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      }
    });

    const colorFilter = <HTMLDivElement>document.querySelector('#color-filter-id');
    colorFilter.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains('filter-item')) {
        const color = getFilterType(element.id) as Color;
        this.settings.updateColorFilter(color);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      }
    });

    const sizeFilter = <HTMLDivElement>document.querySelector('#size-filter-id');
    sizeFilter.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains('filter-item')) {
        const size = getFilterType(element.id) as Size;
        this.settings.updateSizeFilter(size);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      }
    });

    const favoriteOnlyFilter = <HTMLDivElement>document.querySelector('#decor-only-favorite');
    favoriteOnlyFilter.addEventListener('click', () => {
      this.settings.updateFavoriteOnly();
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const rangeCountFilter = document.getElementById('range-count') as target;
    rangeCountFilter.noUiSlider?.on('update', (values) => {
      this.settings.updateCountFilter([+values[0], +values[1]]);
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const rangeYearFilter = document.getElementById('range-year') as target;
    rangeYearFilter.noUiSlider?.on('update', (values) => {
      this.settings.updateYearFilter([+values[0], +values[1]]);
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const resetFiltersBtn = <HTMLButtonElement>document.querySelector('#reset-decor-filters-btn');
    resetFiltersBtn.addEventListener('click', () => {
      this.settings.resetFilters();
      this.getDecorationsPage();
    });

    const resetSettingsBtn = <HTMLButtonElement>document.querySelector('#reset-settings-btn');
    resetSettingsBtn.addEventListener('click', () => {
      this.settings.resetSettings();
      this.getDecorationsPage();
    });
  }

  getXmasTreePage(): void {
    this.view.drawXmasTreePage();
  }
}
