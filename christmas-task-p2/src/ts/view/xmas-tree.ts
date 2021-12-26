import { AppSettings } from '../model/app-settings';

export class XmasTreePage {
  drawPage(settings: AppSettings): HTMLElement {
    const menuDecorBtn = <HTMLElement>document.querySelector('#game-nav-1');
    menuDecorBtn.classList.remove('game-nav__menu-btn_selected');
    const menuXmasTreeBtn = <HTMLElement>document.querySelector('#game-nav-2');
    menuXmasTreeBtn.classList.add('game-nav__menu-btn_selected');

    const xmasTreeContainer: HTMLDivElement = document.createElement('div');
    xmasTreeContainer.classList.add('main-tree-container');
    xmasTreeContainer.innerHTML = `
      <section class="options">
        <div class="option-container">
          <button class="minimaize-btn" id="minimize-btn-0" type="button" title="свернуть"></button>
          <h2 class="option-container__caption">Фон</h2>
          <ul class="option-container__list" id="backgrounds-list">
            <li class="option-item icon-background-1"></li>
            <li class="option-item icon-background-2"></li>
            <li class="option-item icon-background-3"></li>
            <li class="option-item icon-background-4"></li>
            <li class="option-item icon-background-5"></li>
            <li class="option-item icon-background-6"></li>
            <li class="option-item icon-background-7"></li>
            <li class="option-item icon-background-8"></li>
          </ul>
        </div>
        <div class="option-container">
          <button class="minimaize-btn" id="minimize-btn-1" type="button" title="свернуть"></button>
          <h2 class="option-container__caption">Ёлки</h2>
          <ul class="option-container__list" id="trees-list">
            <li class="option-item icon-tree-1"></li>
            <li class="option-item icon-tree-2"></li>
            <li class="option-item icon-tree-3"></li>
            <li class="option-item icon-tree-4"></li>
          </ul>
        </div>
        <div class="option-container">
          <button class="minimaize-btn" id="minimize-btn-2" type="button" title="свернуть"></button>
          <h2 class="option-container__caption">Гирлянды</h2>
          <ul class="option-container__list" id="festoons-list">
            <li class="option-item icon-festoon-1"></li>
            <li class="option-item icon-festoon-2"></li>
            <li class="option-item icon-festoon-3"></li>
            <li class="option-item icon-festoon-4"></li>
          </ul>
        </div>
        <div class="option-container">
          <button class="minimaize-btn" id="minimize-btn-3" type="button" title="свернуть"></button>
          <h2 class="option-container__caption">Игрушки</h2>
          <ul class="option-container__list" id="decor-list">
            <!-- <li class="option-item option_to-grab"></li> -->
          </ul>
        </div>
      </section>
      <section class="tree-view">
        
      </section>
      <section class="options">
        <div class="option-container">
          <h2 class="option-container__caption">Настройки</h2>
          <div class="option-container__list">
            <button
              class="settings-btn ico-snowflake"
              id="snowflakes-btn"
              type="button"
            ></button>
            <button class="settings-btn ${
              <boolean>settings.sound.isMuted ? 'ico-muted' : 'ico-muted-off'
            }" id="mute-btn" type="button"></button>
          </div>
          <button class="decor-filter__reset-btn" id="reset-tree-settings-btn">
            Сбросить настройки
          </button>
          <button class="decor-filter__reset-btn" id="save-xmas-tree-btn">
            Сохранить ёлку
          </button>
        </div>
        <div class="option-container">
          <button class="minimaize-btn" id="minimize-btn-4" type="button" title="свернуть"></button>
          <h2 class="option-container__caption">Вы нарядили</h2>
          <ul class="option-container__list">
            <li class="option-item"></li>
            <li class="option-item"></li>
            <li class="option-item"></li>
            <li class="option-item"></li>
          </ul>
        </div>
      </section>`;

    return xmasTreeContainer;
  }

  soundBtnStateMuted(): void {
    const soundBtn = <HTMLButtonElement>document.querySelector('#mute-btn');
    soundBtn.classList.remove('ico-muted-off');
    soundBtn.classList.add('ico-muted');
  }

  soundBtnStateUnmuted(): void {
    const soundBtn = <HTMLButtonElement>document.querySelector('#mute-btn');
    soundBtn.classList.remove('ico-muted');
    soundBtn.classList.add('ico-muted-off');
  }
}
