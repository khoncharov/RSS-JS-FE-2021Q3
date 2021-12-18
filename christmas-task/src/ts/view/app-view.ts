import { StartPage } from './start';
import { DecorationsPage } from './decorations';
import { XmasTreePage } from './xmas-tree';
import { TDecorData } from '../types';

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

  updateCardList(decorItems: TDecorData | []): void {
    if (decorItems.length === 0) {
      this.decorationsPage.drawEmptyCard();
    } else {
      this.decorationsPage.drawCardsList(decorItems);
    }
  }

  updateFavoriteBadge(cardNode: HTMLLIElement): void {
    cardNode.classList.add('ico-favorite-decor');
  }

  drawXmasTreePage(): void {
    this.xmastreePage.draw();
  }
}
