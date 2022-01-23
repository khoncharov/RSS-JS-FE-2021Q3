import { IWinner } from '../types';

class WinnerTabRow {
  build(winner: IWinner): HTMLElement {
    const { id, winsCount, bestTime, name, color } = winner;
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
