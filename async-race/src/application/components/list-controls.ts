import { CARS_PER_PAGE_LIMIT, WINNERS_PER_PAGE_LIMIT } from '../const';

interface ListControlsState {
  isDisabledPrevBtn: boolean;
  isDisabledNextBtn: boolean;
}

class ListControls {
  build(name: string, page: number, totalNumber: number): HTMLElement {
    const { isDisabledPrevBtn, isDisabledNextBtn } = this.evaluateState(name, page, totalNumber);
    const node = document.createElement('div');
    node.className = 'list__controls';
    node.innerHTML = `
      <button 
        class="ui-btn"
        id="${name}-prev-btn"
        type="button" 
        ${isDisabledPrevBtn ? 'disabled' : ''}
      >
        prev
      </button>
      <button 
        class="ui-btn" 
        id="${name}-next-btn" 
        type="button"  
        ${isDisabledNextBtn ? 'disabled' : ''}
      >
        next
      </button>
      <p class="ui-caption">page: ${page}</p>`;

    node.append();
    return node;
  }

  evaluateState(name: string, page: number, totalNumber: number): ListControlsState {
    let pageLimit = 1;
    if (name === 'garage') {
      pageLimit = CARS_PER_PAGE_LIMIT;
    } else if (name === 'winners') {
      pageLimit = WINNERS_PER_PAGE_LIMIT;
    }
    const pageCount = Math.ceil(totalNumber / pageLimit);
    const isDisabledPrevBtn = page === 1;
    const isDisabledNextBtn = page >= pageCount;
    return {
      isDisabledPrevBtn,
      isDisabledNextBtn,
    };
  }

  setDisabled(prevState: boolean, nextState: boolean): void {
    const prevBtn = document.querySelector('#garage-prev-btn') as HTMLButtonElement;
    const nextBtn = document.querySelector('#garage-next-btn') as HTMLButtonElement;

    prevBtn.disabled = prevState;
    nextBtn.disabled = nextState;
  }
}

export const listControls = new ListControls();
