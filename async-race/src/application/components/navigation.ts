class Navigation {
  build(): DocumentFragment {
    const node = document.createDocumentFragment();
    const logo = document.createElement('h1');
    const navigation = document.createElement('nav');

    logo.className = 'task-logo';
    logo.textContent = 'Async-race';

    navigation.className = 'navigation';
    navigation.innerHTML = `
      <ul class="menu">
        <li class="menu__item">
          <button class="menu__link" type="button" id="game-nav-garage">Garage</a>
        </li>
        <li class="menu__item">
          <button class="menu__link" type="button" id="game-nav-winners">Winners</a>
        </li>
      </ul>
    `;

    node.append(logo, navigation);
    return node;
  }

  gameNavigationHandler(e: Event): void {
    const target = e.target as HTMLElement;

    const isToGarageBtn: boolean = target.id === 'game-nav-garage';
    const isToWinnersBtn: boolean = target.id === 'game-nav-winners';

    const isHiddenSection = (node: HTMLElement): boolean => {
      return node.classList.contains('hidden');
    };
    const garage = document.querySelector('#garage-section') as HTMLElement;
    const winners = document.querySelector('#winners-section') as HTMLElement;

    if (isToGarageBtn && isHiddenSection(garage)) {
      garage.classList.remove('hidden');
      winners.classList.add('hidden');
    } else if (isToWinnersBtn && isHiddenSection(winners)) {
      winners.classList.remove('hidden');
      garage.classList.add('hidden');
    }
  }
}

export const navbar = new Navigation();
