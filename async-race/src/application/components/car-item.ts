class CarItem {
  build(id: number, name: string, color: string): HTMLElement {
    const node = document.createElement('li');
    node.className = 'tracks-table__container';
    node.innerHTML = `    
      <div>
        <div class="track-btn-container">
          <button class="ui-btn" type="button">Select</button>
          <button class="ui-btn" type="button">Delete</button>
        </div>
        <div class="track-btn-container">
          <button class="ui-btn" type="button">Start</button>
          <button class="ui-btn" type="button">Stop</button>
        </div>
      </div>
      <div class="track">
        <h3 class="ui-caption">${id}. ${name}</h3>
        <div class="car" id="car3">
          <div class="car-body" style="background-color: ${color};"></div>
        </div>
      </div>`;
    return node;
  }
}

export const carItem = new CarItem();
