import { createCar, getCarsList } from './api';
import { garageList } from './components/garage-list';
import { c } from './const';
import { utils } from './utils/utils';

export function eventsHandler(e: Event): void {
  const sender = e.target as HTMLElement;

  if (sender.id === 'new-car-submit-btn') {
    createCarHandler(sender);
  } else if (sender.id === 'generate-new-cars-btn') {
    genarateCarsHandler(sender);
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

    await getCarsList();
    garageList.update();
  }
}

async function genarateCarsHandler(sender: HTMLElement): Promise<void> {
  const newCarsList = utils.getRandomCars(c.GENERATE_RANDOM_CARS_NUMBER);
  const genBtn = sender as HTMLButtonElement;
  genBtn.disabled = true;
  await Promise.all(newCarsList.map((car) => createCar(car.name, car.color)));

  await getCarsList();
  garageList.update();
  genBtn.disabled = false;
}
