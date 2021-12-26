import { StartPage } from './start';
import { DecorationsPage } from './decorations';
import { XmasTreePage } from './xmas-tree';
import { Color, Shape, Size, TDecorData, TFavoriteDecor } from '../types';
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

  drawXmasTreePage(settings: AppSettings): void {
    const mainContainer = <HTMLElement>document.querySelector('.main');
    mainContainer.innerHTML = '';
    mainContainer.append(this.xmastreePage.drawPage(settings));
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

  addFilters(settings: AppSettings): void {
    this.decorationsPage.drawFilters();
    this.decorationsPage.setDefaultFocus();
    this.decorationsPage.setSearchQuery(settings.searchQuery);
    this.decorationsPage.setSortType(settings.sortType);
    this.decorationsPage.setShapeFilter(settings.shapeFilter);
    this.decorationsPage.setColorFilter(settings.colorFilter);
    this.decorationsPage.setSizeFilter(settings.sizeFilter);
    this.decorationsPage.setFavoriteOnlyFilter(settings.isFavoriteOnly);
    this.decorationsPage.createCountSlider(settings.countFilter);
    this.decorationsPage.createYearSlider(settings.yearFilter);
  }

  updateShapeFilter(shapeFilter: Set<Shape>) {
    this.decorationsPage.setShapeFilter(shapeFilter);
  }

  updateColorFilter(colorFilter: Set<Color>) {
    this.decorationsPage.setColorFilter(colorFilter);
  }

  updateSizeFilter(sizeFilter: Set<Size>) {
    this.decorationsPage.setSizeFilter(sizeFilter);
  }

  updateFavoriteOnlyFilter(isFavoriteOnly: boolean) {
    this.decorationsPage.setFavoriteOnlyFilter(isFavoriteOnly);
  }

  updateSoundBtn(isMuted: boolean): void {
    if (isMuted) {
      this.xmastreePage.soundBtnStateUnmuted();
    } else {
      this.xmastreePage.soundBtnStateMuted();
    }
  }
}
