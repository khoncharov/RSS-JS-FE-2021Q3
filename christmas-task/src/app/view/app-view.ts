import { StartPage } from './start';
import { DecorationsPage } from './decorations';
import { XmasTreePage } from './xmastree';

export class AppView {
  private startPage = new StartPage();
  private decorationsPage = new DecorationsPage();
  private xmastreePage = new XmasTreePage();

  drawSartPage(): void {
    this.startPage.draw();
  }

  drawDecorationsPage(): void {
    this.decorationsPage.draw();
  }

  drawXmasTreePage(): void {
    this.xmastreePage.draw();
  }
}
