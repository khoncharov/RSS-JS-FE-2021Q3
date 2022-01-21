class Editor {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.className = 'main__section-container';
    node.innerHTML = `
      <h2 class="section-caption">Car editor</h2>
        <div class="editor__item">
          <h3 class="ui-caption">Create</h3>
          <input class="ui-input" type="text" placeholder="Type name" />
          <input class="ui-input" type="color" value="#ff0000" />
          <button class="ui-btn" type="button">Submit</button>
        </div>
        <div class="editor__item">
          <h3 class="ui-caption">Update</h3>
          <input class="ui-input" type="text" placeholder="Change name" />
          <input class="ui-input" type="color" value="#ff0000" />
          <button class="ui-btn disabled" type="button" disabled>Submit</button>
        </div>
        <div class="editor__item">
          <button class="ui-btn" id="btn-generate" type="button" title="Generate 100 random car">
            Generate
          </button>
        </div>`;

    return node;
  }
}

export const editor = new Editor();
