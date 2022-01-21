import { garage } from './components/garage';
import { navbar } from './components/navigation';
import { winners } from './components/winners';
import { eventsHandler } from './events';
import { store } from './store';
import { updateCurrentPage } from './app-state/garage-list-slice';

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

    window.addEventListener('click', eventsHandler);

    // test -----------------------------------------------------------
    // const nextBtn = document.querySelector('#garage-next') as HTMLButtonElement;
    // nextBtn.addEventListener('click', () => {
    //   const page = store.getState().garage.currentPage;
    //   store.dispatch(updateCurrentPage(page + 1));
    // });
  }
}

export const application = new Application();
