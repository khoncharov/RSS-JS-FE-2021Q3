import * as rawDecorData from '../../data/data.json';
import { DecorData } from '../model/decor-data';
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
      } else if (
        (element.parentNode as HTMLElement).nodeName === 'LI' &&
        !(element.parentNode as HTMLElement).classList.contains('decor-card__not-found')
      ) {
        card = element.parentNode as HTMLLIElement;
        this.updateFavoriteDecor(this.getDecorId(card.id));
        this.view.updateFavoriteCount(this.settings.favoriteDecor.size);
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
        console.log(element.id); // --------------------------------------------------------------
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
        console.log(element.id); // --------------------------------------------------------------
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
        console.log(element.id); // --------------------------------------------------------------
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items),
          this.settings.favoriteDecor
        );
      }
    });

    const resetLocalStorageBtn = <HTMLButtonElement>(
      document.querySelector('#reset-localstorage-btn')
    );
    resetLocalStorageBtn.addEventListener('click', () => {
      this.settings.resetLocalStorage();
      this.getDecorationsPage();
    });
  }

  getXmasTreePage(): void {
    this.view.drawXmasTreePage();
  }
}
