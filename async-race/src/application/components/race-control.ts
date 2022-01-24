class RaceControl {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.className = 'main__section-container';
    node.innerHTML = `    
      <h2 class="section-caption">Race control</h2>
      <div class="list__controls">
        <button class="ui-btn" type="button" id="start-race-btn">Start</button>
        <button class="ui-btn" type="button" id="reset-race-btn" disabled>Reset</button>
      </div>`;
    return node;
  }

  setRaceMode(isStarted: boolean): void {
    const btnStart = document.querySelector(`#start-race-btn`) as HTMLButtonElement;
    const btnStop = document.querySelector(`#reset-race-btn`) as HTMLButtonElement;
    if (isStarted) {
      btnStart.disabled = true;
      btnStop.disabled = false;
    } else {
      btnStart.disabled = false;
      btnStop.disabled = true;
    }
  }
}

export const raceControl = new RaceControl();
