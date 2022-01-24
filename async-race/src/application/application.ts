import { getCarsList, getWinnersList } from './api';
import { garage } from './components/garage';
import { garageList } from './components/garage-list';
import { navbar } from './components/navigation';
import { winners } from './components/winners';
import { winnersList } from './components/winners-list';
import { eventsHandler } from './events';

class Application {
  protected page = document.querySelector('#app') as HTMLDivElement;

  init(): void {
    this.createPage();
  }

  createPage(): void {
    this.page.innerHTML = '';

    const header = document.createElement('header');
    header.className = 'header';
    header.append(navbar.build());

    const main = document.createElement('main');
    main.className = 'main';
    main.append(garage.build(), winners.build());

    this.page.append(header, main);

    header.addEventListener('click', navbar.gameNavigationHandler);

    window.addEventListener('click', eventsHandler);
    window.addEventListener('load', async () => {
      await getCarsList();
      await getWinnersList();
      garageList.update();
      winnersList.update();
    });
    window.addEventListener('animationend', (e) => console.log('animation ended by >', e.target));
  }
}

export const application = new Application();
