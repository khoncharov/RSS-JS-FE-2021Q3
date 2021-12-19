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
    this.view.addFilters(); // add settings
    this.view.updateCardList(this.decorData.items, this.settings.favoriteDecor);
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

    const resetLocalStorageBtn = <HTMLButtonElement>(
      document.querySelector('#reset-localstorage-btn')
    );
    resetLocalStorageBtn.addEventListener('click', () => {
      console.log('reset');
      this.settings.resetLocalStorage();
      this.getDecorationsPage();
    });
  }

  getXmasTreePage(): void {
    this.view.drawXmasTreePage();
  }
}
