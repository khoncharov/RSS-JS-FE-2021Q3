class RaceControl {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.className = 'main__section-container';
    node.innerHTML = `    
      <h2 class="section-caption">Race control</h2>
      <div class="list__controls">
        <button class="ui-btn" type="button">Start</button>
        <button class="ui-btn" type="button">Reset</button>
      </div>`;
    return node;
  }
}

export const raceControl = new RaceControl();
