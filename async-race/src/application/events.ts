import { createCar } from './api';

export function eventsHandler(e: Event): void {
  const sender = e.target as HTMLElement;

  if (sender.id === 'new-car-submit-btn') {
    createCarHandler(sender);
  }
}

async function createCarHandler(sender: HTMLElement): Promise<void> {
  const inputName = document.querySelector('#new-car-name-input') as HTMLInputElement;
  const newCarName = inputName.value;
  if (newCarName) {
    const inputColor = document.querySelector('#new-car-color-input') as HTMLInputElement;
    const newCarColor = inputColor.value;
    const data = await createCar(newCarName, newCarColor);
    inputName.value = '';
    inputColor.value = '#ff0000';
    if (Object.keys(data).length) {
      sender.innerText = 'Done!';
      setTimeout(() => {
        sender.innerText = 'Submit';
      }, 500);
    } else {
      sender.innerText = 'Error!';
      setTimeout(() => {
        sender.innerText = 'Submit';
      }, 500);
    }
  }
}
