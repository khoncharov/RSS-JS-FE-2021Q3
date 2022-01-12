import { target } from 'nouislider';
import * as rawDecorData from '../../data/data.json';
import { getDecorId, getFilterType, getIdNum } from '../func-lib/func-lib';
import { DecorData } from '../model/decor-data';
import { Color, Shape, Size } from '../types';
import { AppView } from '../view/app-view';
import { AppController } from './controller';

export class Application extends AppController {
  private view = new AppView();
  private decorData = new DecorData(rawDecorData);

  init(): void {
    this.getHomePage();
  }

  getHomePage(): void {
    this.view.drawSartPage();

    const startBtn = <HTMLElement>document.querySelector('.start-btn');
    startBtn.addEventListener('click', () => {
      this.getDecorationsPage();
    });

    const gameNavigation = document.querySelectorAll('.game-nav__menu-btn');
    const homePageBtn = <HTMLButtonElement>gameNavigation[0];
    homePageBtn.addEventListener('click', () => {
      this.pauseAudio();
      this.getHomePage();
    });

    const decorPageBtn = <HTMLButtonElement>gameNavigation[1];
    decorPageBtn.addEventListener('click', () => {
      this.pauseAudio();
      this.getDecorationsPage();
    });

    const treePageBtn = <HTMLButtonElement>gameNavigation[2];
    treePageBtn.addEventListener('click', () => {
      this.playAudio(<boolean>this.settings.sound.isMuted);
      this.getXmasTreePage();
    });
  }

  getDecorationsPage(): void {
    this.view.drawDecorationsPage();
    this.view.addFilters(this.settings);
    this.view.updateCardList(
      this.filterDecorData(this.decorData.items, this.settings),
      this.settings.favoriteDecor
    );
    this.view.updateFavoriteCount(this.settings.favoriteDecor.size);

    const listContainer = <HTMLUListElement>document.querySelector('.decorations-cards__container');
    listContainer.addEventListener('click', (e) => {
      const element: HTMLElement = e.target as HTMLElement;
      let card: HTMLLIElement;
      if (element.nodeName === 'LI' && !element.classList.contains('decor-card__not-found')) {
        card = element as HTMLLIElement;
        this.updateFavoriteDecor(getDecorId(card.id));
        this.view.updateFavoriteCount(this.settings.favoriteDecor.size);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      } else if (
        (element.parentNode as HTMLElement).nodeName === 'LI' &&
        !(element.parentNode as HTMLElement).classList.contains('decor-card__not-found')
      ) {
        card = element.parentNode as HTMLLIElement;
        this.updateFavoriteDecor(getDecorId(card.id));
        this.view.updateFavoriteCount(this.settings.favoriteDecor.size);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      }
    });

    const searchInput = <HTMLInputElement>document.querySelector('.decor-filter__search-input');
    searchInput.addEventListener('change', () => {
      this.settings.searchQuery = searchInput.value;
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const sortTypeSelect = <HTMLSelectElement>(
      document.querySelector('.decor-filter__select-option')
    );
    sortTypeSelect.addEventListener('change', () => {
      this.settings.sortType = sortTypeSelect.selectedIndex;
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const shapeFilter = <HTMLDivElement>document.querySelector('#shape-filter-id');
    shapeFilter.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains('filter-item')) {
        const shape = getFilterType(element.id) as Shape;
        this.settings.updateShapeFilter(shape);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      }
    });

    const colorFilter = <HTMLDivElement>document.querySelector('#color-filter-id');
    colorFilter.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains('filter-item')) {
        const color = getFilterType(element.id) as Color;
        this.settings.updateColorFilter(color);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      }
    });

    const sizeFilter = <HTMLDivElement>document.querySelector('#size-filter-id');
    sizeFilter.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains('filter-item')) {
        const size = getFilterType(element.id) as Size;
        this.settings.updateSizeFilter(size);
        this.view.updateCardList(
          this.filterDecorData(this.decorData.items, this.settings),
          this.settings.favoriteDecor
        );
      }
    });

    const favoriteOnlyFilter = <HTMLDivElement>document.querySelector('#decor-only-favorite');
    favoriteOnlyFilter.addEventListener('click', () => {
      this.settings.updateFavoriteOnly();
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const rangeCountFilter = document.getElementById('range-count') as target;
    rangeCountFilter.noUiSlider?.on('update', (values) => {
      this.settings.updateCountFilter([+values[0], +values[1]]);
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const rangeYearFilter = document.getElementById('range-year') as target;
    rangeYearFilter.noUiSlider?.on('update', (values) => {
      this.settings.updateYearFilter([+values[0], +values[1]]);
      this.view.updateCardList(
        this.filterDecorData(this.decorData.items, this.settings),
        this.settings.favoriteDecor
      );
    });

    const resetFiltersBtn = <HTMLButtonElement>document.querySelector('#reset-decor-filters-btn');
    resetFiltersBtn.addEventListener('click', () => {
      this.settings.resetFilters();
      this.getDecorationsPage();
    });

    const resetSettingsBtn = <HTMLButtonElement>document.querySelector('#reset-settings-btn');
    resetSettingsBtn.addEventListener('click', () => {
      this.settings.resetSettings();
      this.getDecorationsPage();
    });
  }

  getXmasTreePage(): void {
    let coordX: number;
    let coordY: number;

    this.view.drawXmasTreePage(this.settings, this.decorData.items);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.classList.contains('tree-view')) {
          const treeView = document.querySelector('.tree-view');
          if (treeView) {
            this.view.updateAreaCoords(this.getAreaCoords());
          }
        }
      }
    });
    ro.observe(<HTMLElement>document.querySelector('.tree-view'));
    setTimeout(() => {
      this.view.updateAreaCoords(this.getAreaCoords());
    }, 100);

    const minimizeBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.minimaize-btn');
    minimizeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const container = btn.parentElement as HTMLDivElement;
        const list = <HTMLUListElement>container.querySelector('.option-container__list');
        if (btn.classList.contains('minimaize-btn_minimized')) {
          btn.classList.remove('minimaize-btn_minimized');
          list.classList.remove('option-container__list_minimized');
          this.settings.updateMinimized(getIdNum(btn.id), false);
        } else {
          btn.classList.add('minimaize-btn_minimized');
          list.classList.add('option-container__list_minimized');
          this.settings.updateMinimized(getIdNum(btn.id), true);
        }
      });
    });
    minimizeBtn.forEach((btn) => {
      if (this.settings.minimized[getIdNum(btn.id)]) {
        btn.click();
      }
    });

    const snowflakesBtn = <HTMLButtonElement>document.querySelector('#snowflakes-btn');
    snowflakesBtn.addEventListener('click', () => {
      const snowContainer = <HTMLDivElement>document.querySelector('.snowflakes');
      if (this.settings.isSnowing) {
        this.settings.isSnowing = false;
        snowContainer.classList.add('hidden');
      } else {
        this.settings.isSnowing = true;
        snowContainer.classList.remove('hidden');
      }
    });

    const soundBtn = <HTMLButtonElement>document.querySelector('#mute-btn');
    soundBtn.addEventListener('click', () => {
      this.view.updateSoundBtn(<boolean>this.settings.sound.isMuted);
      this.playAudioHandle(<boolean>this.settings.sound.isMuted);
    });

    const backgroundList = <HTMLUListElement>document.querySelector('#backgrounds-list');
    const backgroundItems = <HTMLLIElement[]>Array.from(backgroundList.children);
    backgroundItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        const btn = e.target as HTMLLIElement;
        const backgroundId = getIdNum(btn.id);
        this.settings.background = backgroundId;
        const bgContainer = <HTMLElement>document.querySelector('.tree-view');
        bgContainer.className = `tree-view icon-background-${backgroundId}`;
      });
    });

    const treesList = <HTMLUListElement>document.querySelector('#trees-list');
    const treesItems = <HTMLLIElement[]>Array.from(treesList.children);
    treesItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        const btn = e.target as HTMLLIElement;
        const treeId = getIdNum(btn.id);
        this.settings.tree = treeId;
        const treeContainer = <HTMLElement>document.querySelector('.tree-view__tree');
        treeContainer.className = `tree-view__tree icon-tree-${treeId}`;
        this.view.updateAreaCoords(this.getAreaCoords());
      });
    });

    /* Drag n Drop */

    const decorList: NodeListOf<HTMLElement> = document.querySelectorAll('.option__img');
    const decorItems = Array.from(decorList);

    decorItems.forEach((item) => {
      item.addEventListener('dragstart', (e) => {
        item.classList.add('selected');
        // e.dataTransfer?.setData('text/html', 'dragstart');
        coordX = e.offsetX;
        coordY = e.offsetY;
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('selected');
      });
    });

    const treeContainer = <HTMLElement>document.querySelector('.tree-view');
    const tree = <HTMLMapElement>document.querySelector('map');
    tree.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    tree.addEventListener('drop', (e) => {
      const selectedToy = <HTMLElement>document.querySelector('.selected');
      const toyCopy = <HTMLElement>selectedToy.cloneNode(true);
      toyCopy.classList.add('moved');
      toyCopy.style.position = 'absolute';
      toyCopy.style.left = e.pageX - coordX - treeContainer.offsetLeft + 'px';
      toyCopy.style.top = e.pageY - coordY - treeContainer.offsetTop + 'px';

      tree.append(toyCopy);
    });

    /* *** */

    const resetSettings = <HTMLButtonElement>document.querySelector('#reset-tree-settings-btn');
    resetSettings.addEventListener('click', () => {
      this.pauseAudio();
      this.settings.resetTreeSettings();
      this.getXmasTreePage();
    });

    const saveTree = <HTMLButtonElement>document.querySelector('#save-xmas-tree-btn');
    saveTree.addEventListener('click', () => {
      console.log('function is not implemented');
    });
  }
}
