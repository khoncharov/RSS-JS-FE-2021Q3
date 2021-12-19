import { StartPage } from './start';
import { DecorationsPage } from './decorations';
import { XmasTreePage } from './xmas-tree';
import { TDecorData, TFavoriteDecor } from '../types';
import { AppSettings } from '../model/app-settings';

export class AppView {
  private startPage = new StartPage();
  private decorationsPage = new DecorationsPage();
  private xmastreePage = new XmasTreePage();

  drawSartPage(): void {
    this.startPage.draw();
  }

  drawDecorationsPage(): void {
    this.decorationsPage.drawPage();
  }

  updateCardList(decorItems: TDecorData | [], favotiveDecor: TFavoriteDecor): void {
    if (decorItems.length === 0) {
      this.decorationsPage.drawEmptyCard();
    } else {
      this.decorationsPage.drawCardsList(decorItems, favotiveDecor);
    }
  }

  addFavorite(decorId: number): void {
    const cardId = `#decor-card-id-${decorId}`;
    const cardNode = <HTMLLIElement>document.querySelector(cardId);
    cardNode.classList.add('ico-favorite-decor');
  }

  removeFavorite(decorId: number): void {
    const cardId = `#decor-card-id-${decorId}`;
    const cardNode = <HTMLLIElement>document.querySelector(cardId);
    cardNode.classList.remove('ico-favorite-decor');
  }

  updateFavoriteCount(n: number): void {
    const counter = <HTMLDivElement>document.querySelector('.fav-counter');
    counter.textContent = n.toString();
  }

  drawXmasTreePage(): void {
    this.xmastreePage.draw();
  }

  addFilters(settings: AppSettings): void {
    this.decorationsPage.drawFilters();
    this.decorationsPage.setDefaultFocus();
    this.decorationsPage.setSortFilter(settings.sortState);
  }
}
