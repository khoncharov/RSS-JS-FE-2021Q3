import { AppSettings } from '../model/app-settings';
import { DecorData } from '../model/decor-data';
import { TRawDecorData } from '../types';
import { AppView } from '../view/app-view';

export class Application {
  private view = new AppView();
  private decorData: DecorData | null = null;
  private settings = new AppSettings();
  private pageNode: HTMLElement | null = null;

  init(): void {
    this.pageNode = <HTMLElement>document.querySelector('#app');
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

  async getDecorationsPage(): Promise<void> {
    try {
      const response = await fetch('./data/data.json');
      const rawData: TRawDecorData = await response.json();
      this.decorData = new DecorData(rawData);
      this.view.drawDecorationsPage(this.decorData.items);
    } catch (err) {
      console.error(err);
    }
  }

  getXmasTreePage(): void {
    this.view.drawXmasTreePage();
  }

  // createPage() {}
  // updatePage() {}
  // desptoyPage() {}
  // createStartPage()

  // class StartPageController
  // class DecorationsPageController
  // class XmasTreePageController
}
