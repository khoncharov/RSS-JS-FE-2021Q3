export class XmasTreePage {
  draw(): void {
    const menuDecorBtn = <HTMLElement>document.querySelector('#game-nav-1');
    menuDecorBtn.classList.remove('game-nav__menu-btn_selected');
    const menuXmasTreeBtn = <HTMLElement>document.querySelector('#game-nav-2');
    menuXmasTreeBtn.classList.add('game-nav__menu-btn_selected');

    const mainContainer = <HTMLElement>document.querySelector('.main');
    mainContainer.innerHTML = '';

    const xmasTreeContainer: HTMLDivElement = document.createElement('div');
    xmasTreeContainer.classList.add('main-tree-container');
    const optionsLeft: HTMLElement = document.createElement('section');
    optionsLeft.classList.add('options-left');
    const treeView: HTMLElement = document.createElement('section');
    treeView.classList.add('tree-view');
    const optionsRight: HTMLElement = document.createElement('section');
    optionsRight.classList.add('options-left');

    xmasTreeContainer.append(optionsLeft, treeView, optionsRight);
    mainContainer.append(xmasTreeContainer);
  }
}
