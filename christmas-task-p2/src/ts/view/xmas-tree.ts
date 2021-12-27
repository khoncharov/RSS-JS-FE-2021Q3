import { AppSettings } from '../model/app-settings';
import { IDecorItem, TDecorData, TFavoriteDecor } from '../types';

export class XmasTreePage {
  drawPage(settings: AppSettings, decorData: TDecorData): HTMLElement {
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
            <li class="option-item icon-background-1" id="background-btn-1"></li>
            <li class="option-item icon-background-2" id="background-btn-2"></li>
            <li class="option-item icon-background-3" id="background-btn-3"></li>
            <li class="option-item icon-background-4" id="background-btn-4"></li>
            <li class="option-item icon-background-5" id="background-btn-5"></li>
            <li class="option-item icon-background-6" id="background-btn-6"></li>
            <li class="option-item icon-background-7" id="background-btn-7"></li>
            <li class="option-item icon-background-8" id="background-btn-8"></li>
          </ul>
        </div>
        <div class="option-container">
          <button class="minimaize-btn" id="minimize-btn-1" type="button" title="свернуть"></button>
          <h2 class="option-container__caption">Ёлки</h2>
          <ul class="option-container__list" id="trees-list">
            <li class="option-item icon-tree-1" id="tree-btn-1"></li>
            <li class="option-item icon-tree-2" id="tree-btn-2"></li>
            <li class="option-item icon-tree-3" id="tree-btn-3"></li>
            <li class="option-item icon-tree-4" id="tree-btn-4"></li>
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
            ${this.createDecorList(settings.favoriteDecor, decorData)}
          </ul>
        </div>
      </section>
      <section class="tree-view ${
        settings.background ? `icon-background-${settings.background}` : ''
      }">
          <div class="snowflakes ${settings.isSnowing ? '' : 'hidden'}">
          <div class="snowflake">❅</div>
          <div class="snowflake">❅</div>
          <div class="snowflake">❆</div>
          <div class="snowflake">❄</div>
          <div class="snowflake">❅</div>
          <div class="snowflake">❆</div>
          <div class="snowflake">❄</div>
          <div class="snowflake">❅</div>
          <div class="snowflake">❆</div>
          <div class="snowflake">❄</div>
        </div>
        <map name="xmas-tree">
          <area id="tree-area" shape="poly" href="#"/>
        </map>
        <div class="tree-view__tree ${settings.tree ? ` icon-tree-${settings.tree}` : ''}"></div>
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

  createDecorList(favoriteDecor: TFavoriteDecor, decorData: TDecorData): string {
    let result = '';
    if (favoriteDecor.size) {
      favoriteDecor.forEach((decorId) => {
        const quantity = this.getQuantity(decorId, decorData);
        result += `
          <li class="option-item option_to-grab">
            <span class="option__decor-count">${quantity}</span>
            <img class="option__img" src="./assets/toys/${decorId}.png">
          </li>`;
      });
    } else {
      for (let i = 1; i <= 20; i += 1) {
        const quantity = this.getQuantity(i, decorData);
        result += `
          <li class="option-item option_to-grab">
            <span class="option__decor-count">${quantity}</span>
            <img class="option__img" src="./assets/toys/${i}.png">
          </li>`;
      }
    }
    return result;
  }

  getQuantity(decorId: number, data: TDecorData): number {
    const item: IDecorItem | undefined = data.find((item) => item.id === decorId);
    if (item) {
      return item.count;
    }
    return 0;
  }
}
