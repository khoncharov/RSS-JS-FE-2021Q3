import { TDecorData } from '../types';

export class DecorationsPage {
  draw(decorItems: TDecorData): void {
    const menuXmasTreeBtn = <HTMLElement>document.querySelector('#game-nav-2');
    menuXmasTreeBtn.classList.remove('game-nav__menu-btn_selected');
    const menuDecorBtn = <HTMLElement>document.querySelector('#game-nav-1');
    menuDecorBtn.classList.add('game-nav__menu-btn_selected');

    const mainContainer = <HTMLElement>document.querySelector('.main');
    mainContainer.innerHTML = '';

    const decorContainer: HTMLDivElement = document.createElement('div');
    decorContainer.classList.add('main-decor-container');
    const filterSection: HTMLElement = document.createElement('section');
    filterSection.classList.add('decor-filter');
    const cardsSection: HTMLElement = document.createElement('section');
    cardsSection.classList.add('decorations-cards');

    decorContainer.append(filterSection, cardsSection);
    mainContainer.append(decorContainer);

    console.log(decorItems);
  }
}
