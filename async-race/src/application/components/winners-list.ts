import { listControls } from './list-controls';

class WinnersList {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.className = 'main__section-container';
    node.innerHTML = `
      <h2 class="section-caption">Winners</h2>
      <div class="list__container">
        <ul class="winners-table"></ul>
      </div>`;

    node.append(listControls.build());
    return node;
  }
}

export const winnersList = new WinnersList();
