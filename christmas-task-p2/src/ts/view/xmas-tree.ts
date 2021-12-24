export class XmasTreePage {
  drawPage(): void {
    const menuDecorBtn = <HTMLElement>document.querySelector('#game-nav-1');
    menuDecorBtn.classList.remove('game-nav__menu-btn_selected');
    const menuXmasTreeBtn = <HTMLElement>document.querySelector('#game-nav-2');
    menuXmasTreeBtn.classList.add('game-nav__menu-btn_selected');

    const mainContainer = <HTMLElement>document.querySelector('.main');
    mainContainer.innerHTML = '';

    const xmasTreeContainer: HTMLDivElement = document.createElement('div');
    xmasTreeContainer.classList.add('main-tree-container');

    xmasTreeContainer.append(
      this.createTreeDecorOptions(),
      this.createTreeView(),
      this.createSettingOptions()
    );
    mainContainer.append(xmasTreeContainer);
  }

  createTreeDecorOptions(): HTMLElement {
    const optionsLeft: HTMLElement = document.createElement('section');
    optionsLeft.classList.add('options-left');
    optionsLeft.append(
      this.createDecorType('Фон', 8),
      this.createDecorType('Ёлки', 4),
      this.createDecorType('Гирлянды', 4),
      this.createDecorType('Игрушки', 20)
    );
    return optionsLeft;
  }

  createDecorType(typeName: string, optionsNum: number): HTMLDivElement {
    const container: HTMLDivElement = document.createElement('div');
    container.className = 'option-container';

    const containerCpation: HTMLElement = document.createElement('h2');
    containerCpation.className = 'option-container__caption';
    containerCpation.textContent = typeName;

    const optionsList: HTMLUListElement = document.createElement('ul');
    optionsList.className = 'option-container__list';

    for (let i = 0; i < optionsNum; i += 1) {
      const optionItem: HTMLLIElement = document.createElement('li');
      optionItem.className = 'option-item option_to-grab';
      optionsList.appendChild(optionItem);
    }

    container.append(this.createMinimizeBtn(), containerCpation, optionsList);
    return container;
  }

  createMinimizeBtn(): HTMLButtonElement {
    const minimizeBtn: HTMLButtonElement = document.createElement('button');
    minimizeBtn.type = 'button';
    minimizeBtn.title = 'свернуть';
    minimizeBtn.className = 'minimaize-btn';
    return minimizeBtn;
  }

  createSettingOptions(): HTMLElement {
    const optionsRight: HTMLElement = document.createElement('section');
    optionsRight.classList.add('options-left');
    return optionsRight;
  }

  createTreeView(): HTMLElement {
    const treeView: HTMLElement = document.createElement('section');
    treeView.classList.add('tree-view');
    return treeView;
  }
}
