import * as rawDecorData from '../../data/data.json';
import { DecorData } from '../model/decor-data';
import { AppView } from '../view/app-view';

export class Application {
  private view = new AppView();
  private decorData = new DecorData(rawDecorData);
  // private settings = new AppSettings();

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
    this.view.drawDecorationsPage(this.decorData.items);
  }

  getXmasTreePage(): void {
    this.view.drawXmasTreePage();
  }

  // createPage() {}
  // updatePage() {}
  // desptoyPage() {}
  // createStartPage()
}
