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

  async update(): Promise<void> {
    const { currentTab, totalWinnersNumber, winnersList } = store.getState().winners;
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
          <th id="winner-id-col-tabhead">Id</th>
          <th class="winner-name-col-tabhead">Name</th>
          <th>Color</th>
          <th id="wins-col-tabhead">Wins</th>
          <th id="time-col-tabhead">Best time, (s)</th>
        </tr>
      </thead>`;

    const tabBoby = document.createElement('tbody');

    if (winnersList.length) {
      for (const winner of winnersList) {
        const tabRowNode = await winnerTabRow.build(winner);
        tabBoby.append(tabRowNode);
      }
    }

    tab.append(tabBoby);
    tabContainer.append(tab);
    node.append(
      tabHeader,
      tabContainer,
      listControls.build(tabName.toLocaleLowerCase(), currentTab, totalWinnersNumber)
    );
  }
}

export const winnersList = new WinnersList();
