export class DecorationsPage {
  draw(): void {
    const menuXmasTreeBtn = <HTMLElement>document.querySelector('#game-nav-2');
    menuXmasTreeBtn.classList.remove('game-nav__menu-btn_selected');
    const menuDecorBtn = <HTMLElement>document.querySelector('#game-nav-1');
    menuDecorBtn.classList.add('game-nav__menu-btn_selected');

    const mainContainer = <HTMLElement>document.querySelector('.main');
    mainContainer.innerHTML = `
      <div class="main-decor-container">
        <section class="decor-filter">
        </section>
        <section class="decorations-cards">
        </section>
      </div>`;
  }
}

//
