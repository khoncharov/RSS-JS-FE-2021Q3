import { getCar } from '../api';
import { IWinner } from '../types';

class WinnerTabRow {
  async build(winner: IWinner): Promise<HTMLElement> {
    const { id, winsCount, bestTime } = winner;
    const carInfo = await getCar(id);
    const node = document.createElement('tr');
    node.innerHTML = `
      <tr>
        <td>${id}</td>
        <td>${carInfo[0].name}</td>
        <td><input class="car-color" type="color" value="${carInfo[0].color}" disabled /></td>
        <td>${winsCount}</td>
        <td>${bestTime}</td>
      </tr>`;

    return node;
  }
}

export const winnerTabRow = new WinnerTabRow();
