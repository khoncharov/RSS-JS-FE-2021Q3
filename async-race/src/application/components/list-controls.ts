class ListControls {
  build(listName: string, pageNumber: number): HTMLElement {
    const node = document.createElement('div');
    node.className = 'list__controls';
    node.innerHTML = `
      <button class="ui-btn" id="${listName}-prev" type="button">prev</button>
      <button class="ui-btn" id="${listName}-next" type="button">next</button>
      <p class="ui-caption">page: ${pageNumber}</p>`;

    node.append();
    return node;
  }
}

export const listControls = new ListControls();
