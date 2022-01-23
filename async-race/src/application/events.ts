import { createCar, deleteCar, getCar, getCarsList, getWinnersList, updateCar } from './api';
import { updateCurrentPage } from './app-state/garage-list-slice';
import {
  SortBy,
  SortOrder,
  updateCurrentTab,
  updateOrder,
  updateSortType,
} from './app-state/winners-list-slice';
import { editor } from './components/editor';
import { garageList } from './components/garage-list';
import { winnersList } from './components/winners-list';
import { c } from './const';
import { store } from './store';
import { utils } from './utils/utils';

export function eventsHandler(e: Event): void {
  const sender = e.target as HTMLButtonElement;

  if (utils.isBtnOfType('new-car-submit', sender.id)) {
    createCarHandler(sender);
  } else if (utils.isBtnOfType('update-car-submit', sender.id)) {
    updateCarHandler(sender);
  } else if (utils.isBtnOfType('generate-new-cars', sender.id)) {
    genarateCarsHandler(sender);
  } else if (utils.isBtnOfType('delete', sender.id)) {
    deleteCarHandler(sender);
  } else if (utils.isBtnOfType('select', sender.id)) {
    selectCarHandler(sender);
  } else if (utils.isBtnOfType('garage-prev', sender.id)) {
    getPrevGaragePageHandler(sender);
  } else if (utils.isBtnOfType('garage-next', sender.id)) {
    getNextGaragePageHandler(sender);
  } else if (utils.isBtnOfType('start-engine', sender.id)) {
    // -----------------------------------------------------------------------------------
    // const res = await changeEngineStatus(1, EngineStatus.Started);
    // console.log(res instanceof Response);
    // if (res instanceof Response && res.status === 200) {
    //   console.log('data >', await res.json());
    // } else if (res instanceof Response && res.status === 500) {
    //   console.log('data >', await res.json());
    // }
    console.log(sender.id);
    const carId = sender.id.split('-btn-')[1];
    (document.querySelector(`#stop-engine-btn-${carId}`) as HTMLButtonElement).disabled = false;
    const car = document.querySelector(`#car${carId}`) as HTMLDivElement;
    console.log(carId);
    car.style.animationName = 'car-movement';
    car.style.animationFillMode = 'both';
    car.style.animationTimingFunction = 'linear';
    car.style.animationDuration = '5s';
    car.style.animationPlayState = 'running';
    // -----------------------------------------------------------------------------------
  } else if (utils.isBtnOfType('stop-engine', sender.id)) {
    // -----------------------------------------------------------------------------------
    // const res = await changeEngineStatus(1, EngineStatus.Drive);
    // if (res instanceof Response && res.status === 200) {
    //   console.log('data >', await res.json());
    // } else if (res instanceof Response && res.status === 500) {
    //   console.log('data>', res);
    //   console.log('data 500 >', await res.json());
    // }
    console.log(sender.id);
    const carId = sender.id.split('-btn-')[1];
    const car = document.querySelector(`#car${carId}`) as HTMLDivElement;
    car.style.animation = 'none';

    // -----------------------------------------------------------------------------------
  } else if (utils.isBtnOfType('start-race', sender.id)) {
    console.log(sender.id);
  } else if (utils.isBtnOfType('reset-race', sender.id)) {
    console.log(sender.id);
  } else if (utils.isBtnOfType('winners-prev', sender.id)) {
    getPrevWinnersTabHandler(sender);
  } else if (utils.isBtnOfType('winners-next', sender.id)) {
    getNextWinnersTabHandler(sender);
  } else if (sender.id === 'winner-id-col-tabhead') {
    sortTableBy(SortBy.Id);
  } else if (sender.id === 'wins-col-tabhead') {
    sortTableBy(SortBy.Wins);
  } else if (sender.id === 'time-col-tabhead') {
    sortTableBy(SortBy.Time);
  }
}

async function createCarHandler(sender: HTMLButtonElement): Promise<void> {
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

async function updateCarHandler(sender: HTMLButtonElement): Promise<void> {
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

async function genarateCarsHandler(sender: HTMLButtonElement): Promise<void> {
  const newCarsList = utils.getRandomCars(c.GENERATE_RANDOM_CARS_NUMBER);
  sender.disabled = true;
  await Promise.all(newCarsList.map((car) => createCar(car.name, car.color)));
  await getCarsList();
  garageList.update();
  sender.disabled = false;
}

async function deleteCarHandler(sender: HTMLButtonElement): Promise<void> {
  const carId = +sender.id.split('-')[2];
  sender.disabled = true;
  await deleteCar(carId);
  await getCarsList();

  const page = store.getState().garage.currentPage;
  const pageCount = Math.ceil(store.getState().garage.totalCarsNumber / c.CARS_PER_PAGE_LIMIT);
  console.log(page, pageCount);

  if (page > pageCount) {
    const newPage = page - 1 ? page - 1 : 1;
    store.dispatch(updateCurrentPage(newPage));
    await getCarsList();
  }

  garageList.update();
}

async function selectCarHandler(sender: HTMLButtonElement): Promise<void> {
  const carId = +sender.id.split('-')[2];
  sender.disabled = true;
  const carList = await getCar(carId);
  if (carList) {
    editor.updateCarChangeForm(carList[0]);
  }
  sender.disabled = false;
  garageList.update();
}

async function getPrevGaragePageHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const page = store.getState().garage.currentPage;
  if (page > 1) {
    store.dispatch(updateCurrentPage(page - 1));
    await getCarsList();
    garageList.update();
  }
  sender.disabled = false;
}

async function getNextGaragePageHandler(sender: HTMLButtonElement): Promise<void> {
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

/* Winners */

async function getPrevWinnersTabHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const page = store.getState().winners.currentTab;
  if (page > 1) {
    store.dispatch(updateCurrentTab(page - 1));
    await getWinnersList();
    winnersList.update();
  }
  sender.disabled = false;
}

async function getNextWinnersTabHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const page = store.getState().winners.currentTab;
  const pageCount = Math.ceil(
    store.getState().winners.totalWinnersNumber / c.WINNERS_PER_PAGE_LIMIT
  );
  if (page < pageCount) {
    store.dispatch(updateCurrentTab(page + 1));
    await getWinnersList();
    winnersList.update();
  }
  sender.disabled = false;
}

async function sortTableBy(newSortType: SortBy): Promise<void> {
  const currentSort = store.getState().winners.sort;
  const currentOrder = store.getState().winners.order;
  if (currentSort === newSortType) {
    if (currentOrder === SortOrder.Asc) {
      store.dispatch(updateOrder(SortOrder.Desc));
    } else {
      store.dispatch(updateOrder(SortOrder.Asc));
    }
  } else {
    store.dispatch(updateSortType(newSortType));
    store.dispatch(updateOrder(SortOrder.Asc));
  }
  await getWinnersList();
  winnersList.update();
}
