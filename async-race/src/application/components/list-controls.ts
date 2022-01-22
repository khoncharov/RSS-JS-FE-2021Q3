import { c } from '../const';
import { store } from '../store';

class ListControls {
  build(listName: string, pageNumber: number): HTMLElement {
    const page = store.getState().garage.currentPage;
    const isDisabledPrevBtn = page === 1;
    const pageCount = Math.ceil(store.getState().garage.totalCarsNumber / c.CARS_PER_PAGE_LIMIT);
    const isDisabledNextBtn = page >= pageCount;

    const node = document.createElement('div');
    node.className = 'list__controls';
    node.innerHTML = `
      <button class="ui-btn" id="${listName}-prev-btn" type="button" ${
      isDisabledPrevBtn ? 'disabled' : ''
    }>prev</button>
      <button class="ui-btn" id="${listName}-next-btn" type="button"  ${
      isDisabledNextBtn ? 'disabled' : ''
    }>next</button>
      <p class="ui-caption">page: ${pageNumber}</p>`;

    node.append();
    return node;
  }
}

export const listControls = new ListControls();
