import { ICar } from '../types';

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
          <input class="ui-input" id="update-car-name-input" type="text" placeholder="Change name" disabled/>
          <input class="ui-input" id="update-car-color-input" type="color" value="#ff0000" disabled/>
          <button class="ui-btn" id="update-car-submit-btn" type="button" disabled>Submit</button>
        </div>
        <div class="editor__item">
          <button class="ui-btn" id="generate-new-cars-btn" type="button" title="Generate 100 random car">
            Generate
          </button>
        </div>`;

    return node;
  }

  updateCarChangeForm(car: ICar): void {
    if (Object.keys(car).length > 0) {
      const selected = car as ICar;
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
    const inputEditName = document.querySelector('#update-car-name-input') as HTMLInputElement;
    const inputEditColor = document.querySelector('#update-car-color-input') as HTMLInputElement;
    const btnEditCarSubmit = document.querySelector(`#update-car-submit-btn`) as HTMLButtonElement;
    inputEditName.value = '';
    inputEditColor.value = '#ff0000';
    inputEditName.disabled = true;
    inputEditColor.disabled = true;
    btnEditCarSubmit.disabled = true;
  }

  isDisabled(value: boolean): void {
    const inputNewName = document.querySelector('#new-car-name-input') as HTMLInputElement;
    const inputNewColor = document.querySelector('#new-car-color-input') as HTMLInputElement;
    const btnNewCarSubmit = document.querySelector(`#new-car-submit-btn`) as HTMLButtonElement;
    const inputEditName = document.querySelector('#update-car-name-input') as HTMLInputElement;
    const inputEditColor = document.querySelector('#update-car-color-input') as HTMLInputElement;
    const btnEditCarSubmit = document.querySelector(`#update-car-submit-btn`) as HTMLButtonElement;
    const btnGenerate = document.querySelector(`#generate-new-cars-btn`) as HTMLButtonElement;
    if (value) {
      inputNewName.disabled = value;
      inputNewColor.disabled = value;
      btnNewCarSubmit.disabled = value;
      inputEditName.disabled = value;
      inputEditColor.disabled = value;
      btnEditCarSubmit.disabled = value;
      btnGenerate.disabled = value;
    } else {
      inputNewName.disabled = value;
      inputNewColor.disabled = value;
      btnNewCarSubmit.disabled = value;
      inputEditName.disabled = !value;
      inputEditColor.disabled = !value;
      btnEditCarSubmit.disabled = !value;
      btnGenerate.disabled = value;
    }
  }
}

export const editor = new Editor();
