class ListControls {
  build(): HTMLElement {
    const node = document.createElement('div');
    node.className = 'list__controls';
    node.innerHTML = `
      <button class="ui-btn" type="button">prev</button>
      <button class="ui-btn" type="button">next</button>
      <p class="ui-caption">page: X</p>`;

    node.append();
    return node;
  }
}

export const listControls = new ListControls();
