import { target } from 'nouislider';
import * as rawDecorData from '../../data/data.json';
import { DecorData } from '../model/decor-data';
import { Color, Shape, Size } from '../types';
import { AppView } from '../view/app-view';
import { AppController } from './controller';

export class Application extends AppController {
  private view = new AppView();
  private decorData = new DecorData(rawDecorData);

  init(): void {
    this.view.drawSartPage();

    const startBtn = <HTMLElement>document.querySelector('.start-btn');
    const gameNavigation = <HTMLElement>document.querySelector('.game-nav__container');
    const favCounter = <HTMLElement>document.querySelector('.fav-counter');

    startBtn.addEventListener('click', () => {
      this.getDecorationsPage();
      gameNavigation.classList.remove('hidden');
      favCounter.classList.remove('hidden');
    });

    gameNavigation.addEventListener('click', (e) => {
      const menuBtn = e.target as HTMLElement;
      if (
        menuBtn.id === 'game-nav-1' &&
        !menuBtn.classList.contains('game-nav__menu-btn_selected')
      ) {
        this.getDecorationsPage();
      } else if (
        menuBtn.id === 'game-nav-2' &&
        !menuBtn.classList.contains('game-nav__menu-btn_selected')
      ) {
        this.getXmasTreePage();
      }
    });
  }

  getDecorationsPage(): void {
    this.view.drawDecorationsPage();
    this.view.addFilters(this.settings);
    this.view.updateCardList(
      this.filterDecorData(this.decorData.items),
      this.settings.favoriteDecor
    );
    this.view.updateFavoriteCount(this.settings.favoriteDecor.size);

    const listContainer = <HTMLUListElement>document.querySelector('.decorations-cards__container');
    listContainer.addEventListener('click', (e) => {
      const element: HTMLElement = e.target as HTMLElement;
      let card: HTMLLIElement;
      if (element.nodeName === 'LI' && !element.classList.contains('decor-card__not-found')) {
        card = element as HTMLLIElement;
        this.updateFavoriteDecor(this.getDecorId(card.id));
        this.view.updateFavoriteCount(this.settings.favoriteDecor.size);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items),
          this.settings.favoriteDecor
        );
      } else if (
        (element.parentNode as HTMLElement).nodeName === 'LI' &&
        !(element.parentNode as HTMLElement).classList.contains('decor-card__not-found')
      ) {
        card = element.parentNode as HTMLLIElement;
        this.updateFavoriteDecor(this.getDecorId(card.id));
        this.view.updateFavoriteCount(this.settings.favoriteDecor.size);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items),
          this.settings.favoriteDecor
        );
      }
    });

    const searchInput = <HTMLInputElement>document.querySelector('.decor-filter__search-input');
    searchInput.addEventListener('change', () => {
      this.settings.searchQuery = searchInput.value;
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items),
        this.settings.favoriteDecor
      );
    });

    const sortTypeSelect = <HTMLSelectElement>(
      document.querySelector('.decor-filter__select-option')
    );
    sortTypeSelect.addEventListener('change', () => {
      this.settings.sortType = sortTypeSelect.selectedIndex;
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items),
        this.settings.favoriteDecor
      );
    });

    const shapeFilter = <HTMLDivElement>document.querySelector('#shape-filter-id');
    shapeFilter.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains('filter-item')) {
        const shape = this.getFilterType(element.id) as Shape;
        this.settings.updateShapeFilter(shape);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items),
          this.settings.favoriteDecor
        );
      }
    });

    const colorFilter = <HTMLDivElement>document.querySelector('#color-filter-id');
    colorFilter.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains('filter-item')) {
        const color = this.getFilterType(element.id) as Color;
        this.settings.updateColorFilter(color);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items),
          this.settings.favoriteDecor
        );
      }
    });

    const sizeFilter = <HTMLDivElement>document.querySelector('#size-filter-id');
    sizeFilter.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains('filter-item')) {
        const size = this.getFilterType(element.id) as Size;
        this.settings.updateSizeFilter(size);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items),
          this.settings.favoriteDecor
        );
      }
    });

    const favoriteOnlyFilter = <HTMLDivElement>document.querySelector('#decor-only-favorite');
    favoriteOnlyFilter.addEventListener('click', () => {
      this.settings.updateFavoriteOnly();
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items),
        this.settings.favoriteDecor
      );
    });

    const rangeCountFilter = document.getElementById('range-count') as target;
    rangeCountFilter.noUiSlider?.on('update', (values) => {
      this.settings.updateCountFilter([+values[0], +values[1]]);
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items),
        this.settings.favoriteDecor
      );
    });

    const rangeYearFilter = document.getElementById('range-year') as target;
    rangeYearFilter.noUiSlider?.on('update', (values) => {
      this.settings.updateYearFilter([+values[0], +values[1]]);
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items),
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
