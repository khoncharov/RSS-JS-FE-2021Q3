import { listControls } from './list-controls';
import { winnerTabRow } from './win-tab-row';

class WinnersList {
  build(): HTMLElement {
    const listName = 'Winners';
    const node = document.createElement('section');
    node.className = 'main__section-container';
    node.innerHTML = `
      <h2 class="section-caption">${listName}</h2>
      <div class="list__container">
        <table>
          <thead id="winners-tabhead">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Color</th>
              <th id="wins-col-tabhead">Wins</th>
              <th id="time-col-tabhead">Best time, (s)</th>
            </tr>
          </thead>
          <tbody id="winners-tabbody"></tbody>
        </table>
      </div>`;

    node.append(listControls.build(listName.toLocaleLowerCase(), 11111));
    return node;
  }

  update(): void {
    const tabBoby = document.querySelector('#winners-tabbody') as HTMLTableSectionElement;
    tabBoby.append(
      winnerTabRow.build(
        { id: 1, winsCount: 11, bestTime: 1.11 },
        { id: 1, name: 'Tesla', color: '#00ff89' }
      ),
      winnerTabRow.build(
        { id: 1, winsCount: 11, bestTime: 1.11 },
        { id: 1, name: 'Tesla', color: '#00ff89' }
      )
    );
    // if (carsList.length) {
    //   carsList.forEach((car) => {
    //     list.append(carItem.build(car.id, car.name, car.color));
    //   });
    // }

    // listContainer.append(list);
    // node.append(
    //   listHeader,
    //   listContainer,
    //   listControls.build(listName.toLocaleLowerCase(), currentPage)
    // );
  }
}

export const winnersList = new WinnersList();
