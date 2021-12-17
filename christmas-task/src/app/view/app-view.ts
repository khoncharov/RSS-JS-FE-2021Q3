import { StartPage } from './start';
import { DecorationsPage } from './decorations';
import { XmasTreePage } from './xmastree';
import { TDecorData } from '../types';

export class AppView {
  private startPage = new StartPage();
  private decorationsPage = new DecorationsPage();
  private xmastreePage = new XmasTreePage();

  drawSartPage(): void {
    this.startPage.draw();
  }

  drawDecorationsPage(decorItems: TDecorData): void {
    this.decorationsPage.draw(decorItems);
  }

  drawXmasTreePage(): void {
    this.xmastreePage.draw();
  }
}
