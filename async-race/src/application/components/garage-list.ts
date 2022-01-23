import { store } from '../store';
import { carItem } from './car-item';
import { listControls } from './list-controls';

class GarageList {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.className = 'main__section-container';
    node.id = 'cars-list-section';
    return node;
  }

  update(): void {
    const { carsList, currentPage, totalCarsNumber } = store.getState().garage;
    const listName = 'Garage';
    const node = document.querySelector('#cars-list-section') as HTMLElement;
    node.innerHTML = '';

    const listHeader = document.createElement('h2');
    listHeader.className = 'section-caption';
    listHeader.innerText = `${listName} (${totalCarsNumber})`;

    const listContainer = document.createElement('div');
    listContainer.className = 'list__container';

    const list = document.createElement('ul');
    list.className = 'tracks-table';

    if (carsList.length) {
      carsList.forEach((car) => {
        list.append(carItem.build(car.id, car.name, car.color));
      });
    }

    listContainer.append(list);
    node.append(
      listHeader,
      listContainer,
      listControls.build(listName.toLocaleLowerCase(), currentPage, totalCarsNumber)
    );
  }
}

export const garageList = new GarageList();
