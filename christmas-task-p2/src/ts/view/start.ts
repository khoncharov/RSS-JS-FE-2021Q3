export class StartPage {
  draw(): void {
    const pageContainer = <HTMLElement>document.querySelector('#app');
    pageContainer.innerHTML = `      
      <header class="header">
        <nav class="game-nav">
          <ul class="game-nav__container hidden">
            <li>
              <button class="game-nav__menu-btn" id="game-nav-0" type="button">
                <img class="game-nav__menu-btn-img" src="./assets/svg/tree.svg" alt="Tree icon" />
              </button>
            </li>
            <li>
              <button class="game-nav__menu-btn" id="game-nav-1" type="button">
                Игрушки
              </button>
            </li>
            <li>
              <button class="game-nav__menu-btn" id="game-nav-2" type="button">
                Ёлки
              </button>
            </li>
          </ul>
        </nav>
        <div class="fav-counter hidden" title="Любимых игрушек">0</div>
      </header>
      <main class="main">
        <div class="game-title__container">
          <div class="decoration-ball-1"></div>
          <div class="decoration-ball-2"></div>
          <div class="game-title">
            <h1 class="game-title__caption">Помогите бабушке<br />нарядить ёлку</h1>
          </div>
          <button class="start-btn" type="button">Начать</button>
        </div>
      </main>
      <footer class="footer">
        <a class="footer__link" href="https://github.com/khoncharov">
          <img class="footer__logo" src="./assets/svg/github.svg" alt="Github logo" />
        </a>
        <div class="footer__year">2021</div>
        <a class="footer__link" href="https://rs.school/js/">
          <img class="footer__logo" src="./assets/svg/rs_school_js.svg" alt="RSSchool logo" />
        </a>
      </footer>`;
  }
}
