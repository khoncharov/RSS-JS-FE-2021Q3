import { garage } from './components/garage';
import { navbar } from './components/navigation';
import { winners } from './components/winners';

class Application {
  protected page = document.querySelector('#app') as HTMLDivElement;

  async init(): Promise<void> {
    await this.createPage();
  }

  async createPage(): Promise<void> {
    this.page.innerHTML = '';

    const header = document.createElement('header');
    header.className = 'header';
    header.append(navbar.build());

    const main = document.createElement('main');
    main.className = 'main';
    main.append(await garage.build(), await winners.build());

    this.page.append(header, main);

    header.addEventListener('click', navbar.gameNavigationHandler);
  }
}

export const application = new Application();
