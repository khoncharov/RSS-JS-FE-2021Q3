import { listControls } from './list-controls';

class GarageList {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.className = 'main__section-container';
    node.innerHTML = `
      <h2 class="section-caption">Garage</h2>
      <div class="list__container">
        <ul class="tracks-table"></ul>
      </div>`;

    node.append(listControls.build());
    return node;
  }
}

export const garageList = new GarageList();
