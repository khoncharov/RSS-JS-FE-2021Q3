export class XmasTreePage {
  draw(): void {
    const menuDecorBtn = <HTMLElement>document.querySelector('#game-nav-1');
    menuDecorBtn.classList.remove('game-nav__menu-btn_selected');
    const menuXmasTreeBtn = <HTMLElement>document.querySelector('#game-nav-2');
    menuXmasTreeBtn.classList.add('game-nav__menu-btn_selected');

    const mainContainer = <HTMLElement>document.querySelector('.main');
    mainContainer.innerHTML = `
      <div class="main-tree-container">
        <section class="left"></section>
        <section class="middle"></section>
        <section class="right"></section>
      </div>`;
  }
}
