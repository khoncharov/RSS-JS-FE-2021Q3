import { Car } from '../types';

class Editor {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.className = 'main__section-container';
    node.innerHTML = `
      <h2 class="section-caption">Car editor</h2>
        <div class="editor__item">
          <h3 class="ui-caption">Create</h3>
          <input class="ui-input" id="new-car-name-input" type="text" placeholder="Type name" />
          <input class="ui-input" id="new-car-color-input" type="color" value="#ff0000" />
          <button class="ui-btn" id="new-car-submit-btn" type="button">Submit</button>
        </div>
        <div class="editor__item" id="editor-update-car-form">
          <h3 class="ui-caption">Update</h3>
          <input class="ui-input" type="text" placeholder="Change name" disabled/>
          <input class="ui-input" type="color" value="#ff0000" disabled/>
          <button class="ui-btn" type="button" disabled>Submit</button>
        </div>
        <div class="editor__item">
          <button class="ui-btn" id="generate-new-cars-btn" type="button" title="Generate 100 random car">
            Generate
          </button>
        </div>`;

    return node;
  }

  updateCarChangeForm(car: Car): void {
    if (Object.keys(car).length > 0) {
      const selected = car as Car;
      const node = document.querySelector('#editor-update-car-form') as HTMLDivElement;
      node.innerHTML = '';
      node.innerHTML = `
        <h3 class="ui-caption">Update</h3>
        <input class="ui-input" id="update-car-name-input" type="text" placeholder="Change name" value="${selected.name}"/>
        <input class="ui-input" id="update-car-color-input" type="color" value="${selected.color}"/>
        <button class="ui-btn" type="button" id="update-car-submit-btn" data-car-id=${selected.id}>Submit</button>`;
    }
  }

  disableCarChangeForm(): void {
    const node = document.querySelector('#editor-update-car-form') as HTMLDivElement;
    node.innerHTML = '';
    node.innerHTML = `
      <h3 class="ui-caption">Update</h3>
      <input class="ui-input" type="text" placeholder="Change name" disabled/>
      <input class="ui-input" type="color" value="#ff0000" disabled/>
      <button class="ui-btn" type="button" disabled>Submit</button>`;
  }
}

export const editor = new Editor();
