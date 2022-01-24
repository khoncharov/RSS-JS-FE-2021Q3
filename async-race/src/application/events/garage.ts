import {
  createCar,
  deleteCar,
  deleteWinner,
  getCar,
  getCarsList,
  getWinnersList,
  updateCar,
} from '../api';
import { updateCurrentPage } from '../app-state/garage-list-slice';
import { editor } from '../components/editor';
import { garageList } from '../components/garage-list';
import { winnersList } from '../components/winners-list';
import { c } from '../const';
import { store } from '../store';
import { utils } from '../utils/utils';

export async function createCarHandler(sender: HTMLButtonElement): Promise<void> {
  const inputName = document.querySelector('#new-car-name-input') as HTMLInputElement;
  const newCarName = inputName.value;
  if (newCarName) {
    sender.disabled = true;
    const inputColor = document.querySelector('#new-car-color-input') as HTMLInputElement;
    const newCarColor = inputColor.value;
    await createCar(newCarName, newCarColor);
    inputName.value = '';
    inputColor.value = '#ff0000';
    await getCarsList();
    garageList.update();
    sender.disabled = false;
  }
}

export async function updateCarHandler(sender: HTMLButtonElement): Promise<void> {
  const inputName = document.querySelector('#update-car-name-input') as HTMLInputElement;
  const newCarName = inputName.value;
  if (newCarName) {
    sender.disabled = true;
    const carId: number = +(sender.getAttribute('data-car-id') as string);
    const inputColor = document.querySelector('#update-car-color-input') as HTMLInputElement;
    const newCarColor = inputColor.value;
    await updateCar(carId, newCarName, newCarColor);
    await getCarsList();
    garageList.update();
    sender.disabled = false;
    editor.disableCarChangeForm();
  }
}

export async function genarateCarsHandler(sender: HTMLButtonElement): Promise<void> {
  const newCarsList = utils.getRandomCars(c.GENERATE_RANDOM_CARS_NUMBER);
  sender.disabled = true;
  await Promise.all(newCarsList.map((car) => createCar(car.name, car.color)));
  await getCarsList();
  garageList.update();
  sender.disabled = false;
}

export async function deleteCarHandler(sender: HTMLButtonElement): Promise<void> {
  const carId = +sender.id.split('-')[2];
  sender.disabled = true;
  await deleteCar(carId);
  await deleteWinner(carId);
  await getCarsList();

  const page = store.getState().garage.currentPage;
  const pageCount = Math.ceil(store.getState().garage.totalCarsNumber / c.CARS_PER_PAGE_LIMIT);

  if (page > pageCount) {
    const newPage = page - 1 ? page - 1 : 1;
    store.dispatch(updateCurrentPage(newPage));
    await getCarsList();
  }
  garageList.update();

  await getWinnersList();
  winnersList.update();
}

export async function selectCarHandler(sender: HTMLButtonElement): Promise<void> {
  const carId = +sender.id.split('-')[2];
  sender.disabled = true;
  const carList = await getCar(carId);
  if (carList) {
    editor.updateCarChangeForm(carList[0]);
  }
  sender.disabled = false;
  garageList.update();
}

export async function getPrevGaragePageHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const page = store.getState().garage.currentPage;
  if (page > 1) {
    store.dispatch(updateCurrentPage(page - 1));
    await getCarsList();
    garageList.update();
  }
  sender.disabled = false;
}

export async function getNextGaragePageHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const page = store.getState().garage.currentPage;
  const pageCount = Math.ceil(store.getState().garage.totalCarsNumber / c.CARS_PER_PAGE_LIMIT);
  if (page < pageCount) {
    store.dispatch(updateCurrentPage(page + 1));
    await getCarsList();
    garageList.update();
  }
  sender.disabled = false;
}
