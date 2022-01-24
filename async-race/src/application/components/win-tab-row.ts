import { getCar } from '../api';
import { IWinner } from '../types';

class WinnerTabRow {
  async build(winner: IWinner): Promise<HTMLElement> {
    const { id, wins, time } = winner;
    const node = document.createElement('tr');

    const data = await getCar(id);

    if (data && data.length > 0) {
      const carInfo = data[0];

      node.innerHTML = `
      <tr>
        <td>${id}</td>
        <td>${carInfo.name}</td>
        <td>
          <input class="car-color" type="color" value="${carInfo.color}" disabled />
        </td>
        <td>${wins}</td>
        <td>${time}</td>
      </tr>`;
    }

    return node;
  }
}

export const winnerTabRow = new WinnerTabRow();
