class CarItem {
  build(id: number, name: string, color: string): HTMLElement {
    const node = document.createElement('li');
    node.className = 'tracks-table__container';
    node.innerHTML = `    
      <div>
        <div class="track-btn-container">
          <button class="ui-btn" id="select-btn-${id}" type="button">Select</button>
          <button class="ui-btn" id="delete-btn-${id}" type="button">Delete</button>
        </div>
        <div class="track-btn-container">
          <button class="ui-btn" type="button" id="start-engine-btn-${id}">Start</button>
          <button class="ui-btn" type="button" id="stop-engine-btn-${id}" disabled>Stop</button>
        </div>
      </div>
      <div class="track">
        <h3 class="ui-caption">${id}. ${name}</h3>
        <div class="car" id="car${id}">
          <div class="car-body" style="background-color: ${color};"></div>
          <div class="dashboard"></div>
        </div>
      </div>`;
    return node;
  }
}

export const carItem = new CarItem();
