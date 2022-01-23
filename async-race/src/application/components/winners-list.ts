import { store } from '../store';
import { listControls } from './list-controls';
import { winnerTabRow } from './win-tab-row';

class WinnersList {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.className = 'main__section-container';
    node.id = 'winners-tab-section';
    return node;
  }

  update(): void {
    const { currentPage, totalWinnersNumber, winnersList } = store.getState().winners;
    const tabName = 'Winners';
    const node = document.querySelector('#winners-tab-section') as HTMLElement;
    node.innerHTML = '';

    const tabHeader = document.createElement('h2');
    tabHeader.className = 'section-caption';
    tabHeader.innerText = `${tabName} (${totalWinnersNumber})`;

    const tabContainer = document.createElement('div');
    tabContainer.className = 'list__container';

    const tab = document.createElement('table');
    tab.innerHTML = `
      <thead id="winners-tabhead">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Color</th>
          <th id="wins-col-tabhead">Wins</th>
          <th id="time-col-tabhead">Best time, (s)</th>
        </tr>
      </thead>`;

    const tabBoby = document.createElement('tbody');

    if (winnersList.length) {
      winnersList.forEach((winner) => {
        tabBoby.append(winnerTabRow.build(winner));
      });
    }

    tab.append(tabBoby);
    tabContainer.append(tab);
    node.append(
      tabHeader,
      tabContainer,
      listControls.build(tabName.toLocaleLowerCase(), currentPage, totalWinnersNumber)
    );
  }
}

export const winnersList = new WinnersList();
