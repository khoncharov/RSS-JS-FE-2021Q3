import { ICar, IWinner } from '../types';

class WinnerTabRow {
  build(winner: IWinner, car: ICar): HTMLElement {
    const { id, winsCount, bestTime } = winner;
    const { name, color } = car;
    const node = document.createElement('tr');
    node.innerHTML = `
      <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td><input class="car-color" type="color" value="${color}" disabled /></td>
        <td>${winsCount}</td>
        <td>${bestTime}</td>
      </tr>`;

    return node;
  }
}

export const winnerTabRow = new WinnerTabRow();
